const textDiv = document.querySelector(".text-body");
const url = window.location.href;
const id = url.split("/")[4];

async function getContent() {
  const response = await fetch(`/intro/json`, {
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
