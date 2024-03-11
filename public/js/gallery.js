const Modal = {
  modalHolder: document.getElementById("modal-holder"),
  box: document.createElement("div"),
  description: document.createElement("div"),
  boxPhoto: document.createElement("img"),
  closeButton: document.createElement("span"),
  openModal: function (source, imgDescription) {
    this.modalHolder.appendChild(this.box);
    this.box.appendChild(this.closeButton);
    this.box.appendChild(this.boxPhoto);
    this.box.appendChild(this.description);

    this.closeButton.textContent = "x";
    this.boxPhoto.src = source;
    this.description.innerText = imgDescription;

    this.box.className = "modal";
    this.closeButton.className = "close-button";
    this.modalHolder.className = "modal-holder";
    this.boxPhoto.className = "box-photo";
    this.description.className = "img-description";

    this.closeButton.addEventListener("click", close);
  },
  closeModal: function () {
    this.modalHolder.innerHTML = "";
    this.modalHolder.className = "";
  },
};

function close() {
  Modal.closeModal();
}

const addClickHandler = (img) => {
  img.addEventListener("click", () => {
    const photo = img.querySelector(".image");
    Modal.openModal(photo.src, photo.dataset.description);
  });
};

const images = document.querySelectorAll(".image-container");
images.forEach(addClickHandler);

const filterDiv = document.getElementById("gallery-country-filter");
const tagOptions = [];

const tags = filterDiv.dataset.tags.split(",");
tags.pop();

tags.forEach((tag) => {
  tagOptions.push({ label: tag, value: tag });
});

const urlParams = new URLSearchParams(window.location.search);
const countryFilter = urlParams.get("country");

VirtualSelect.init({
  ele: "#gallery-country-filter",
  options: tagOptions,
  multiple: false,
  showSelectedOptionsFirst: true,
  required: true,
  search: true,
  selectedValue: countryFilter,
});

filterDiv.addEventListener("reset", () => {
  window.location.replace(`${document.location.origin}/gallery`);
});

filterDiv.addEventListener("change", (evt) => {
  url = `${document.location.origin}/gallery/?country=${evt.target.value}`;

  evt.stopPropagation();

  if (evt.target.value !== countryFilter) {
    window.location.replace(url);
  }
});

const imageGallery = document.querySelector(".image-gallery");
const allImages = document.querySelectorAll(".image-container img");
let lastDate = allImages[8].dataset.created;
const loadMoreButton = document.getElementById("load-more");

const loadMore = async () => {
  const data = { lastDate, country: countryFilter };

  const results = await fetch("/api/gallery", {
    body: JSON.stringify(data),
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newImgs = await results.json();

  newImgs.imgUrls.forEach((image, index) => {
    const container = document.createElement("div");
    const img = document.createElement("img");
    const overlay = document.createElement("div");

    container.classList.add("image-container");
    img.classList.add("image");
    img.src = image.url;
    img.dataset.description = image.desc;
    overlay.classList.add("overlay");

    container.append(img, overlay);
    imageGallery.appendChild(container);

    if (index === newImgs.imgUrls.length - 1) {
      lastDate = image.createdAt;
    }

    addClickHandler(container);
  });

  if (newImgs.lastPage === true) {
    loadMoreButton.remove();
  }
};

loadMoreButton.addEventListener("click", loadMore);
