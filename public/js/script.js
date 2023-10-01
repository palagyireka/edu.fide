const lista2listak = document.getElementsByClassName("lista-2");
const lista2elemek = document.querySelectorAll(".lista-2 > li");
const lista1 = document.querySelector(".lista-1");
const lista1elemek = document.querySelectorAll(".lista-1 > li");
const l2bk = document.querySelectorAll(".l2b");
function lista2beallitas() {
  lista2listak[0].style.justifyContent = "left";
  lista1elemek[0].style.backgroundSize = "100% 0.1em";
  lista2listak[0].classList.add("lista-2-active");
  lista2listak[1].style.justifyContent = "left";
  lista2listak[2].style.justifyContent = "center";
  lista2listak[3].style.justifyContent = "center";
  lista2listak[4].style.justifyContent = "right";
  lista2listak[5].style.justifyContent = "right";
  lista2listak[6].style.justifyContent = "right";
}
lista2beallitas();
function lista1huzas() {
  for (const lista of lista1elemek) {
    lista.style.backgroundSize = "0% 0.1em";
  }
}

for (const elem of lista1elemek) {
  elem.addEventListener("click", fixalj);
  elem.addEventListener("touchend", fixalj);
  elem.addEventListener("mouseover", (evt) => {
    for (const klista of lista2listak) {
      klista.classList.remove("lista-2-active");
    }
    lista1huzas();
    evt.target.nextElementSibling.classList.add("lista-2-active");
    evt.target.style.backgroundSize = "100% 0.1em";
  });
}

for (const gomb of l2bk) {
  gomb.addEventListener("click", vissza);
  gomb.addEventListener("touchend", vissza);
}

window.addEventListener("resize", atallit);
function atallit() {
  if (window.innerWidth > 1150 || window.screen.width > 1150) {
    lista1.style.left = "0";
    for (const elem of lista1elemek) {
      elem.style.textDecoration = "none";
      elem.style.visibility = "visible";
    }
    for (const elem of lista2listak) {
      elem.classList.remove("onmobile2");
      elem.classList.remove("ontablet2");
      elem.style.display = "none";
    }
  }
  if (
    (window.innerWidth <= 1150 || window.screen.width <= 1150) &&
    (window.innerWidth > 810 || window.screen.width > 810) &&
    document.getElementById("menu-icon").checked
  ) {
    for (const elem of lista1elemek) {
      elem.style.visibility = "visible";
    }
  }
  if (window.innerWidth <= 810 || window.screen.width <= 810) {
    for (const elem of lista1elemek) {
      elem.style.visibility = "hidden";
      elem.style.textDecoration = "none";
    }
  }
}

document.querySelector("#menu-icon").addEventListener("click", helyreAllit);
document.querySelector("#menu-icon").addEventListener("touchend", helyreAllit);

function helyreAllit() {
  lista1.style.left = "0";
  for (const elem of lista1elemek) {
    elem.style.textDecoration = "none";
    elem.style.visibility = "visible";
  }
  for (const elem of lista2listak) {
    elem.classList.remove("onmobile2");
    elem.classList.remove("ontablet2");
    elem.style.display = "none";
  }
}

function fixalj(evt) {
  for (const elem of lista1elemek) {
    elem.style.textDecoration = "none";
  }
  for (const elem of lista2listak) {
    lista2beallitas();
    elem.classList.remove("onmobile2");
    elem.classList.remove("ontablet2");
  }
  if (
    (window.innerWidth <= 1150 || window.screen.width <= 1150) &&
    (window.innerWidth > 850 || window.screen.width > 850)
  ) {
    evt.target.style.textDecoration = "underline";
    evt.target.nextElementSibling.style.display = "flex";
    evt.target.nextElementSibling.classList.add("ontablet2");
  }
  if (window.innerWidth <= 850 || window.screen.width <= 850) {
    for (const elem of lista1elemek) {
      elem.style.visibility = "hidden";
    }
    evt.target.nextElementSibling.classList.add("onmobile2");
    evt.target.nextElementSibling.style.display = "flex";
  }
}

function vissza(evt) {
  for (const elem of lista2listak) {
    elem.classList.remove("onmobile2");
    elem.style.display = "none";
  }
  for (const elem of lista1elemek) {
    elem.style.visibility = "visible";
  }
}

const kereseskep = document.getElementById("kereses");
if (window.innerWidth <= 1150 || window.screen.width <= 1150) {
  kereseskep.src = "css/searchiconmt.png";
}
