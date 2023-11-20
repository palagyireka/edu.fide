const pigeonFiles = document.querySelector("iframe");
if (pigeonFiles) {
  pigeonFiles.classList.add("pigeonframe");
}
const textDiv = document.querySelector(".text-body");

const getPath = () => {
  const params = window.location.pathname.split("/");
  params.shift();
  return params.join("/");
};

const path = getPath();

async function getContent() {
  const response = await fetch(`/${path}/json`, {
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
