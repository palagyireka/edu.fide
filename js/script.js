const lista2Elemek = document.getElementsByClassName("lista-2");
const lista1Elemek = document.getElementsByClassName("lista-1");

function igazitsdBalra() {
  lista2Elemek[0].style.justifyContent = "left";
  lista2Elemek[1].style.justifyContent = "left";
}

function igazitsdJobbra() {
  lista2Elemek[5].style.justifyContent = "right";
  lista2Elemek[4].style.justifyContent = "right";
}

function egyIgazitas() {
  if (window.innerWidth >= 1083) {
    lista2Elemek[2].style.justifyContent = "left";
    lista2Elemek[2].style.paddingLeft = "19.7vw";
  } else {
    lista2Elemek[2].style.paddingLeft = "0";
  }
}

function fixalj() {
  for (let i = 0; i < 6; i++) {
    lista2Elemek[i].style.display = "flex";
    lista2Elemek[i].style.top = "0";
    lista2Elemek[i].style.height = "46vh";
    lista2Elemek[i].style.width = "35vw";
    lista2Elemek[i].style.flexWrap = "wrap";
    lista2Elemek[i].style.flexDirection = "column";
  }
}
