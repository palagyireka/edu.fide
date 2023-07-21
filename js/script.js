const lista2listak = document.getElementsByClassName("lista-2");
const lista2elemek = document.querySelectorAll(".lista-2 > li");
const lista1 = document.querySelector(".lista-1");
const lista1elemek = document.querySelectorAll(".lista-1 > li");
const l2bk = document.querySelectorAll(".l2b");
lista2listak[0].style.justifyContent = "left";
lista2listak[1].style.justifyContent = "left";
lista2listak[5].style.justifyContent = "right";
lista2listak[4].style.justifyContent = "right";

for (const elem of lista1elemek) {
  elem.addEventListener("click", fixalj);
  elem.addEventListener("touchend", fixalj);
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
    (window.innerWidth > 850 || window.screen.width > 850) &&
    document.getElementById("menu-icon").checked
  ) {
    for (const elem of lista1elemek) {
      elem.style.visibility = "visible";
    }
  }
  if (window.innerWidth <= 850 || window.screen.width <= 850) {
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
    elem.style.justifyContent = "center";
    elem.style.display = "none";
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

// Kereső oldal js

document.querySelector("#search").addEventListener("click", nojjMeg);
document.querySelector("#search").addEventListener("focusout", menjOssze);
function nojjMeg(evt) {
  evt.target.parentElement.style.width = "45%";
}
function menjOssze(evt) {
  evt.target.parentElement.style.width = "35%";
}

for (const elem of lista1elemek) {
  elem.addEventListener("mouseover", lejjebbKuld);
  elem.addEventListener("mouseout", visszaKuld);
}
for (const elem of lista2elemek) {
  elem.addEventListener("mouseover", lejjebbKuld);
  elem.addEventListener("mouseout", visszaKuld);
}
function lejjebbKuld() {
  document.getElementById("searchpm").style.top = "225px";
}
function visszaKuld() {
  document.getElementById("searchpm").style.top = "175px";
}

var orszagLista = document.getElementById("orszag-search");
for (const orszag of countryCodes) {
  let option = document.createElement("option");
  option.text = orszag.name;
  orszagLista.add(option);
}
