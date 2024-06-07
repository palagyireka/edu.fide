const gep =
  window.innerWidth > 1200 &&
  window.screen.width > 1200 &&
  window.outerWidth > 1200;
const bookts = document.querySelectorAll(".booktxt");
bookts.forEach((booktxt) => {
  let booktext = booktxt.getAttribute("data-b");
  booktext = JSON.parse(booktext);
  const tempQuill = new Quill(document.createElement("div"), {
    modules: {
      imageResize: {},
    },
  });
  tempQuill.setContents(booktext);
  booktxt.innerHTML += tempQuill.root.innerHTML;
});

document.querySelectorAll(".bookw").forEach((b) => {
  if (gep) {
    b.style.width = `${b.querySelector(".booklbl img").offsetWidth + 30}px`;
    const ad = b.querySelector(".bookad")
      ? b.querySelector(".bookad").offsetHeight
      : 0;
    b.style.height = `${
      b.querySelector(".booklbl img").offsetHeight + ad + 30
    }px`;
  }
});

document.querySelectorAll(".bookpop").forEach((p) => {
  const lbl = p.querySelector(".booklbl");
  const input = p.previousElementSibling;
  const txt = p.querySelector(".booktxt");
  const img = lbl.firstElementChild.cloneNode(true);
  lbl.addEventListener("click", (evt) => {
    evt.preventDefault();
    input.checked = true;
    togglePopup(p, input, txt, lbl, img);
  });
  input.addEventListener("change", () => {
    togglePopup(p, input, txt, lbl, img);
  });
});

function togglePopup(p, input, txt, lbl, img) {
  if (input.checked) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    p.classList.add("book-popup");
    lbl.style.display = "none";
    txt.insertBefore(img, txt.firstChild);
    document.querySelector("body").classList.add("no-scroll");
  } else {
    p.classList.remove("book-popup");
    img.remove();
    document.querySelector("body").classList.remove("no-scroll");
    lbl.style.display = "block";
  }
}
