const textDiv = document.querySelector(".text");
const url = window.location.href;

async function getContent() {
  const response = await fetch(`${url}/edit/json`, {
    method: "GET",
  });
  const quillContent = await response.json();

  var tempQuill = new Quill(document.createElement("div"), {
    modules: {
      imageResize: {},
    },
  });
  tempQuill.setContents(quillContent.text);
  textDiv.innerHTML += tempQuill.root.innerHTML;
}

getContent();
