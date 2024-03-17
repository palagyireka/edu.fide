VirtualSelect.init({
  ele: "#language-select",
  options: [
    { label: "English", value: "default" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Russian", value: "ru" },
  ],
  hideClearButton: true,
  autoSelectFirstOption: true,
});

const survey = new Survey.Model(surveyJson);
survey.focusFirstQuestionAutomatic = false;

function arrayToString(obj) {
  Object.keys(obj)
    .filter((key) => Array.isArray(obj[key]))
    .forEach((key) => {
      obj[key] = obj[key][0];
    });

  return obj;
}

async function sendResults(sender) {
  const data = arrayToString(sender.data);

  fetch("/certification/fide-schools", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error();
      }
    })
    .then(() => {
      document.location.href =
        "/certification/fide-schools/successful-application";
    })
    .catch(() => {
      document.location.href = "/certification/fide-schools/unsuccessful";
    });
}

// survey.locale = "de";

survey.onComplete.add(sendResults);

const converter = new showdown.Converter();
survey.onTextMarkdown.add(function (survey, options) {
  let str = converter.makeHtml(options.text);
  str = str.substring(3);
  str = str.substring(0, str.length - 4);
  options.html = str;
});

$(function () {
  $("#form").Survey({ model: survey });
});

const languageSelector = document.querySelector("#language-select");

const changeLanguage = (evt) => {
  survey.locale = evt.target.value;
};

languageSelector.addEventListener("change", changeLanguage);

function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

const pasteWarning = (evt) => {
  const paste = evt.clipboardData.getData("text");
  if (paste.length >= evt.target.maxLength) {
    const warningContainer = document.createElement("div");
    warningContainer.innerText = `The pasted text exceeds the limit of ${evt.target.maxLength} characters in this answer.`;
    warningContainer.classList.add("warning-container");
    evt.target.parentNode.parentNode.appendChild(warningContainer);
  }
};

const pasteWarningDelete = (evt) => {
  const container =
    evt.target.parentNode.parentNode.querySelector(".warning-container");

  if (container && evt.target.value.length < evt.target.maxLength) {
    container.remove();
  }
};

function watchForInput() {
  const inputs = document.querySelectorAll(".sd-input");
  if (inputs) {
    inputs.forEach((input) => {
      input.addEventListener("paste", pasteWarning);
      input.addEventListener("focusout", pasteWarningDelete);
    });
  }
}

const observer = new MutationObserver(watchForInput);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
