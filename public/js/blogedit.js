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
      handlers: { image: quill_img_handler },
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

const quill = new Quill("#editor", editorOptions);
const saveBtn = document.getElementById("save-edit");
const url = window.location.href;
const id = url.split("/")[4];
const titleInput = document.getElementById("title");

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
      formData.append("file", files[0]);

      this.quill.enable(false);

      fetch("/api/image", {
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
  const response = await fetch(`/api/${id}/json`, {
    method: "GET",
  });
  const quillContent = await response.json();
  titleInput.value = quillContent.title;
  quill.setContents(quillContent.text);
}

// const editorptions = {
//   theme: 'snow',
//   modules: {
//       toolbar: {
//           container: [['bold', 'italic', 'underline', 'strike'], ['link', 'image', 'video']],
//           handlers: { image: quill_img_handler },
//       },
//   },
// };

// function quill_img_handler() {
//   let fileInput = this.container.querySelector('input.ql-image[type=file]');

//   if (fileInput == null) {
//       fileInput = document.createElement('input');
//       fileInput.setAttribute('type', 'file');
//       fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
//       fileInput.classList.add('ql-image');
//       fileInput.addEventListener('change', () => {
//           const files = fileInput.files;
//           const range = this.quill.getSelection(true);

//           if (!files || !files.length) {
//               console.log('No files selected');
//               return;
//           }

//           const formData = new FormData();
//           formData.append('file', files[0]);

//           this.quill.enable(false);

//           axios
//               .post('/api/image', formData)
//               .then(response => {
//                   this.quill.enable(true);
//                   this.quill.editor.insertEmbed(range.index, 'image', response.data.url_path);
//                   this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
//                   fileInput.value = '';
//               })
//               .catch(error => {
//                   console.log('quill image upload failed');
//                   console.log(error);
//                   this.quill.enable(true);
//               });
//       });
//       this.container.appendChild(fileInput);
//   }
//   fileInput.click();
// }

const clickHandler = async () => {
  const titleContent = document.getElementById("title").value;
  const textContent = quill.getContents();
  const imageContent = quill.root.innerHTML
    .match(/<img [^>]*src="[^"]*"[^>]*>/gm)
    .map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));
  const postData = JSON.stringify({
    title: titleContent,
    text: textContent,
    image: { url: imageContent[0], filename: imageContent[0].split("/").pop() },
  });
  fetch(`/blog/${id}`, {
    method: "PUT",
    body: postData,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      window.location.replace(`/blog/${id}`);
    })
    .catch(() => {
      window.location.replace(`/blog/${id}/edit`);
    });
};

getContent();

saveBtn.addEventListener("click", clickHandler);
