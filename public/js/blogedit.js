const editorOptions = {
  theme: "snow",
  // modules: {
  //   toolbar: {
  //     container: [
  //       ["bold", "italic", "underline", "strike"],
  //       ["link", "image"],
  //     ],
  //   },
  // },
};
const quill = new Quill("#editor", editorOptions);
const saveBtn = document.getElementById("save-edit");
const url = window.location.href;
const id = url.split("/")[4];
const titleInput = document.getElementById("title");

async function getContent() {
  const response = await fetch(`${url}/json`, {
    method: "GET",
  });
  const quillContent = await response.json();
  titleInput.value = quillContent.title;
  quill.setContents(quillContent.text);
}

getContent();

// const editor_options = {
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

async function putData(url, data) {
  await fetch(url, {
    method: "PUT",
    body: data,
    headers: {
      Accept: "*/*",
    },
  });
}

const clickHandler = async () => {
  const titleContent = document.getElementById("title").value;
  const textContent = quill.getContents();
  const imageContent = document.getElementById("image").files[0];
  let formData = new FormData();
  formData.append("title", titleContent);
  formData.append("text", textContent);
  formData.append("image", imageContent);

  putData(`/blog/${id}`, formData)
    .then(() => {
      window.location.replace(`/blog/${id}`);
    })
    .catch(() => {
      window.location.replace(`/blog/${id}/edit`);
    });
};

saveBtn.addEventListener("click", clickHandler);
