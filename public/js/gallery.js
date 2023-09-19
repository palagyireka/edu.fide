const Modal = {
  modalHolder: document.getElementById("modalHolder"),
  box: document.createElement("div"),
  boxPhoto: document.createElement("img"),
  closeButton: document.createElement("span"),
  openModal: function (source) {
    this.modalHolder.appendChild(this.box);
    this.box.appendChild(this.boxPhoto);
    this.box.appendChild(this.closeButton);

    this.closeButton.textContent = "x";
    this.boxPhoto.src = source;

    this.box.className = "modal";
    this.closeButton.className = "closeButton";
    this.modalHolder.className = "modalHolder";
    this.boxPhoto.className = "boxPhoto";

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

const images = document.querySelectorAll(".image");
images.forEach((img) => {
  img.addEventListener("click", () => {
    Modal.openModal(img.src);
  });
});
