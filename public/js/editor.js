const editorOptions = {
  theme: "snow",
  modules: {
    imageResize: {},
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["link", "image"],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
      ],
      handlers: { image: quill_img_handler },
    },
  },
};

const quill = new Quill("#editor", editorOptions);
const saveBtn = document.getElementById("save-edit");

function quill_img_handler() {
  let fileInput = this.container.querySelector("input.ql-image[type=file]");

  if (fileInput == null) {
    fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute(
      "accept",
      "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
    );
    fileInput.classList.add("ql-image");
    fileInput.addEventListener("change", () => {
      const files = fileInput.files;
      const range = this.quill.getSelection(true);

      if (!files || !files.length) {
        console.log("No files selected");
        return;
      }

      const formData = new FormData();
      formData.append("folder", "static_pages");
      formData.append("file", files[0]);

      this.quill.enable(false);

      fetch("/api/image/", {
        body: formData,
        method: "post",
      })
        .then(async (response) => {
          const imgResp = await response.json();
          this.quill.enable(true);
          this.quill.editor.insertEmbed(range.index, "image", imgResp.urlPath);
          this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
          fileInput.value = "";
        })
        .catch((error) => {
          console.log("quill image upload failed");
          console.log(error);
          this.quill.enable(true);
        });
    });
    this.container.appendChild(fileInput);
  }
  fileInput.click();
}

async function getContent() {
  const response = await fetch("json", {
    method: "GET",
  });
  const quillContent = await response.json();
  quill.setContents(quillContent.text);
}

const getPath = () => {
  const params = window.location.pathname.split("/");
  params.pop();
  params.shift();
  return params;
};

const path = getPath();

const clickHandler = async () => {
  const textContent = quill.getContents();

  const images = quill.root.innerHTML.match(/<img [^>]*src="[^"]*"[^>]*>/gm);
  let imageContent;

  if (images) {
    const bareImages = images.map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));
    imageContent = bareImages.map((img) => {
      return { url: img, filename: img.split("/").pop() };
    });
  }

  const postData = JSON.stringify({
    text: textContent,
  });

  fetch(`/${path}`, {
    method: "PUT",
    body: postData,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      window.location.replace(`/${path}`);
    })
    .catch(() => {
      window.location.replace(`/${path}/edit`);
    });
};

getContent();

saveBtn.addEventListener("click", () => {
  clickHandler();
});
