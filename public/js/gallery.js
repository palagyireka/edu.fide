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

if (window.innerWidth > 1150 || window.screen.width > 1150) {
  document
    .querySelector(".next-last a:nth-of-type(2)")
    .addEventListener("mouseover", (evt) => {
      evt.target.previousElementSibling.style.marginLeft = "65px";
    });
  document
    .querySelector(".next-last a:nth-of-type(2)")
    .addEventListener("mouseout", (evt) => {
      evt.target.previousElementSibling.style.marginLeft = "15px";
    });
}

const tags = document.getElementById("country-filter").dataset.tags.split(",");
tags.pop();

const tagOptions = [];

tags.forEach((tag) => {
  tagOptions.push({ label: tag, value: tag });
});

// VirtualSelect.init({
//   ele: "#country-filter",
//   options: tagOptions,
//   multiple: false,
//   showSelectedOptionsFirst: true,
//   required: true,
//   search: true,
// });

// document.querySelector("#country-filter").addEventListener("change", (evt) => {
//   window.location.replace(
//     `${document.location.origin}/gallery/?country=${evt.target.value}`
//   );
// });
