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
const url = window.location.href;
const id = url.split("/")[4];
const titleInput = document.getElementById("title");

const tagSelect = document.querySelector("#tag-select");
const countrySelect = document.querySelector("#country-select");
const featured = document.querySelector("#featured-box");

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

const clickHandler = async () => {
  const titleContent = document.getElementById("title").value;
  const textContent = quill.getContents();

  const images = quill.root.innerHTML.match(/<img [^>]*src="[^"]*"[^>]*>/gm);
  let imageContent;
  let tags;
  let taggedCountries;

  if (images) {
    const bareImages = images.map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));
    imageContent = bareImages.map((img) => {
      ({ url: img, filename: img.split("/").pop() });
    });
  }

  tagSelect.isAllSelected() ? (tags = ["all"]) : (tags = tagSelect.value);
  countrySelect.isAllSelected()
    ? (taggedCountries = ["all"])
    : (taggedCountries = countrySelect.value);

  const postData = {
    title: titleContent,
    text: textContent,
    images: images ? imageContent : null,
    tags: tags,
    countries: taggedCountries,
    featured: featured.checked,
  };

  fetch("/admin/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      window.location.replace("/admin/posts");
    })
    .catch(() => {
      window.location.replace("/admin/posts");
    });
};

// --------TAG SELECT--------

const countryOptions = countryCodes.map((x) => {
  return { label: x.name, value: x["alpha-2"] };
});

const tagOptions = [
  { label: "Commission News", value: "commisionNews" },
  { label: "Conferences", value: "conferences" },
  { label: "CIE Initiatives", value: "cieInitiatives" },
  { label: "Personal Stories", value: "personalStories" },
  { label: "Research News", value: "researchNews" },
  { label: "Course News", value: "courseNews" },
  { label: "CIE News", value: "cieNews" },
  { label: "Blog", value: "blog" },
];

VirtualSelect.init({
  ele: "#country-select",
  options: countryOptions,
  multiple: true,
  showSelectedOptionsFirst: true,
  required: true,
});

VirtualSelect.init({
  ele: "#tag-select",
  options: tagOptions,
  multiple: true,
  search: false,
  required: true,
});

saveBtn.addEventListener("click", () => {
  if (tagSelect.validate() && countrySelect.validate()) {
    clickHandler();
  }
});
