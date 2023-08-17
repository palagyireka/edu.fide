const quill = new Quill("#editor", {
  theme: "snow",
});
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
}

getContent();

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
