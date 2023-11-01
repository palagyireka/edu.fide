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
let originalTags = [];
let originalCountries = [];

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
      formData.append("folder", "posts");
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
  featured.checked = quillContent.featured;
  quill.setContents(quillContent.text);
  if (
    typeof quillContent.tags !== "undefined" &&
    typeof quillContent.countries !== "undefined"
  ) {
    originalTags = quillContent.tags;
    originalCountries = quillContent.countries;
    console.log(originalTags, originalCountries);
  }
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
      return { url: img, filename: img.split("/").pop() };
    });
    console.log(imageContent);
  }

  tagSelect.isAllSelected() ? (tags = ["All"]) : (tags = tagSelect.value);
  countrySelect.isAllSelected()
    ? (taggedCountries = ["All"])
    : (taggedCountries = countrySelect.value);

  const postData = JSON.stringify({
    title: titleContent,
    text: textContent,
    images: images ? imageContent : null,
    tags: tags,
    countries: taggedCountries,
    featured: featured.checked,
  });

  fetch(`/admin/${id}`, {
    method: "PUT",
    body: postData,
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
  window.location.replace("/admin/posts");
};

const countryOptions = countryCodes.map((x) => {
  return { label: x.name, value: x["alpha-2"] };
});

const tagOptions = [
  { label: "Commission News", value: "commissionNews" },
  { label: "Conferences", value: "conferences" },
  { label: "CIE Initiatives", value: "cieInitiatives" },
  { label: "Personal Stories", value: "personalStories" },
  { label: "Research News", value: "researchNews" },
  { label: "Course News", value: "courseNews" },
  { label: "CIE News", value: "cieNews" },
  { label: "Blog", value: "blog" },
];

getContent().then(() => {
  VirtualSelect.init({
    ele: "#tag-select",
    options: tagOptions,
    multiple: true,
    search: false,
    required: true,
    selectedValue: originalTags,
  });

  VirtualSelect.init({
    ele: "#country-select",
    options: countryOptions,
    multiple: true,
    showSelectedOptionsFirst: true,
    required: true,
    selectedValue: originalCountries,
  });
});

saveBtn.addEventListener("click", () => {
  const countrySelector = document.querySelector(
    "#country-select div .vscomp-toggle-button"
  );
  const tagSelector = document.querySelector(
    "#tag-select div .vscomp-toggle-button"
  );

  tagSelector.classList.remove("not-valid");
  countrySelector.classList.remove("not-valid");

  if (tagSelect.validate() && countrySelect.validate()) {
    clickHandler();
  } else {
    if (!tagSelect.validate()) {
      tagSelector.classList.add("not-valid");
    }
    if (!countrySelect.validate()) {
      countrySelector.classList.add("not-valid");
    }
  }
});
