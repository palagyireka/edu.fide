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

const images = document.querySelectorAll(".image-container");
images.forEach((img) => {
  img.addEventListener("click", () => {
    const photo = img.querySelector(".image");
    Modal.openModal(photo.src, photo.dataset.description);
  });
});

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

  if (window.location.href !== url) {
    window.location.replace(url);
  }
});
