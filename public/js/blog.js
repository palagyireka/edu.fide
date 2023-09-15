const textDiv = document.querySelector(".text");
const url = window.location.href;
const id = url.split("/")[4];

async function getContent() {
  const response = await fetch(`/api/${id}/json`, {
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
