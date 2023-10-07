const lista2listak = document.querySelectorAll(".lista-2");
const lista2elemek = document.querySelectorAll(".lista-2 > li");
const lista1 = document.querySelector(".lista-1");
const lista1elemek = document.querySelectorAll(".lista-1 > li");

function listaBeallitas() {
  if (window.innerWidth > 1200 || window.screen.width > 1200) {
    lista1elemek[0].classList.add("lista-1-hover");
    lista1elemek.forEach((lista) => {
      lista.addEventListener("mouseenter", (evt) => {
        elrejtVagyMutat(false, lista2listak);
        lista1elemek.forEach((elem) => elem.classList.remove("lista-1-hover"));
        evt.target.classList.add("lista-1-hover");
        evt.target.nextElementSibling &&
          evt.target.nextElementSibling.classList.add("lista-2");
      });
    });
  } else {
    for (const elem of lista1elemek) {
      elem.addEventListener("touchstart", (evt) => {
        const firstChild = evt.target.firstElementChild;
        const isFirstChildAnchor = firstChild && firstChild.tagName === "A";
        if (isFirstChildAnchor) {
          return;
        } else {
          if (
            (window.innerWidth <= 1200 || window.screen.width <= 1200) &&
            (window.innerWidth > 810 || window.screen.width > 810)
          ) {
            elrejtVagyMutat(false, lista2listak);
            evt.target.nextElementSibling.classList.add("ontablet2");
          } else if (window.innerWidth <= 810 || window.screen.width <= 810) {
            elrejtVagyMutat(false, lista1elemek);
            elrejtVagyMutat(false, lista2listak);
            evt.target.nextElementSibling.classList.add("onmobile2");
          }
        }
      });
    }
  }
  lista2listak[0].style.justifyContent = "left";
  lista2listak[1].style.justifyContent = "left";
  lista2listak[2].style.justifyContent = "left";
  lista2listak[3].style.justifyContent = "center";
  lista2listak[4].style.justifyContent = "right";
  lista2listak[5].style.justifyContent = "right";
  lista2listak[6].style.justifyContent = "right";
  if (window.innerWidth <= 1200 || window.screen.width <= 1200) {
    document.getElementById("kereses").src = "css/searchiconmt.png";
  }
}
listaBeallitas();
window.addEventListener("resize", listaBeallitas);

document.querySelectorAll(".l2b").forEach((gomb) => {
  gomb.addEventListener("touchstart", (evt) => {
    evt.target.parentElement.classList.remove("onmobile2");
    elrejtVagyMutat(true, lista1elemek);
  });
});

document.querySelector("#menu-icon").addEventListener("touchstart", (evt) => {
  if (evt.target.checked) {
    elrejtVagyMutat(true, lista2listak);
  }
});

function elrejtVagyMutat(mutat, lista) {
  if (mutat) {
    for (const elem of lista) {
      elem.style.display = "block";
      if (lista == lista2listak) {
        elem.classList.add("lista-2");
      }
    }
  } else {
    for (const elem of lista) {
      elem.style.display = "none";
      elem.classList.remove("lista-2");
      elem.classList.remove("ontablet2");
    }
  }
}
