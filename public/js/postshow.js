const textDiv = document.querySelector(".text-body");
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

  const imgs = document.querySelectorAll(".text-body img");

  imgs.forEach((img) => {
    const parent = img.parentNode;
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img-wrapper");

    parent.replaceChild(imgWrapper, img);
    imgWrapper.appendChild(img);
  });
}

getContent();
