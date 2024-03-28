const textDiv = document.querySelector("#contact-text");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const country = params.country;
let quill;

if (document.getElementById("editor")) {
  const Link = Quill.import("formats/link");

  Link.PROTOCOL_WHITELIST = ["http", "https", "mailto"];

  class CustomLinkSanitizer extends Link {
    static sanitize(url) {
      const sanitizedUrl = super.sanitize(url);

      if (!sanitizedUrl || sanitizedUrl === "about:blank") return sanitizedUrl;

      const hasWhitelistedProtocol = this.PROTOCOL_WHITELIST.some(function (
        protocol
      ) {
        return sanitizedUrl.startsWith(protocol);
      });

      if (hasWhitelistedProtocol) return sanitizedUrl;

      return `http://${sanitizedUrl}`;
    }
  }

  Quill.register(CustomLinkSanitizer, true);

  const editorOptions = {
    theme: "snow",
    modules: {
      imageResize: {},
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["undo", "redo"],
          ["link", "image"],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
        ],
        handlers: {
          image: quill_img_handler,
          undo: undoHandler,
          redo: redoHandler,
        },
      },
    },
  };

  const icons = Quill.import("ui/icons");
  icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
  icons["redo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

  quill = new Quill("#editor", editorOptions);

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
        formData.append("folder", "contacts");
        formData.append("file", files[0]);

        this.quill.enable(false);

        fetch("/api/image", {
          body: formData,
          method: "post",
        })
          .then(async (response) => {
            const imgResp = await response.json();
            this.quill.enable(true);
            this.quill.editor.insertEmbed(
              range.index,
              "image",
              imgResp.urlPath
            );
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

  function undoHandler() {
    quill.history.undo();
  }

  function redoHandler() {
    quill.history.redo();
  }

  const saveHandler = async () => {
    const textContent = quill.getContents();

    const data = JSON.stringify({
      country: country,
      contactDelta: textContent,
    });

    fetch(`/contact`, {
      method: "PUT",
      body: data,
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        window.location.replace(`/contact?country=${country}`);
      })
      .catch(() => {
        window.location.replace(`/contact?country=${country}`);
      });
  };

  const saveBtn = document.getElementById("contact-save");
  if (saveBtn) {
    saveBtn.addEventListener("click", saveHandler);
  }
}
async function getContent() {
  const response = await fetch(`/api/contact?country=${country}`, {
    method: "GET",
  });
  const quillContent = await response.json();

  var tempQuill = new Quill(document.createElement("div"), {
    modules: {
      imageResize: {},
    },
  });
  tempQuill.setContents(quillContent.contactDelta);

  if (document.getElementById("editor")) {
    quill.setContents(quillContent.contactDelta);
  }

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
