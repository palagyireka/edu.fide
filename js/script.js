const lista2Elemek = document.getElementsByClassName("lista-2");
const lista1Elem = document.querySelector(".lista-1");
lista2Elemek[0].style.justifyContent = "left";
lista2Elemek[1].style.justifyContent = "left";
lista2Elemek[5].style.justifyContent = "right";
lista2Elemek[4].style.justifyContent = "right";

for (let i = 0; i < lista2Elemek.length; i++) {
  lista2Elemek[i].style.content = `${i}`;
}

if (window.innerWidth >= 1083) {
  lista2Elemek[2].style.justifyContent = "left";
  lista2Elemek[2].style.paddingLeft = "19.7vw";
} else {
  lista2Elemek[2].style.paddingLeft = "0";
}

const lista1elemek = lista1Elem.querySelectorAll("li");
for (const elem of lista1elemek) {
  elem.addEventListener("click", fixalj);
}

function fixalj(evt) {
  if (window.innerWidth >= 635) {
    evt.target.style.visibility = "hidden";
  } else {
    evt.target.style.visibility = "hidden";
  }
}
