const Modal = {
  modalHolder: document.getElementById("modal-holder"),
  box: document.createElement("div"),
  boxPhoto: document.createElement("img"),
  closeButton: document.createElement("span"),
  openModal: function (source) {
    this.modalHolder.appendChild(this.box);
    this.box.appendChild(this.closeButton);
    this.box.appendChild(this.boxPhoto);

    this.closeButton.textContent = "x";
    this.boxPhoto.src = source;

    this.box.className = "modal";
    this.closeButton.className = "close-button";
    this.modalHolder.className = "modal-holder";
    this.boxPhoto.className = "box-photo";

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
    img.querySelector(".image");
    Modal.openModal(img.querySelector(".image").src);
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
