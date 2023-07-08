const lista2listak = document.getElementsByClassName("lista-2");
const lista2elemek = document.querySelectorAll(".lista-2 > li");
const lista1 = document.querySelector(".lista-1");
const lista1elemek = document.querySelectorAll(".lista-1 > li");
const l2bk = document.querySelectorAll(".l2b");
lista2listak[0].style.justifyContent = "left";
lista2listak[1].style.justifyContent = "left";
lista2listak[5].style.justifyContent = "right";
lista2listak[4].style.justifyContent = "right";

for(const elem of lista1elemek){
  elem.addEventListener("click", fixalj);
  elem.addEventListener("touchend", fixalj);
}
for(const gomb of l2bk){
  gomb.addEventListener("click", vissza);
  gomb.addEventListener("touchend", vissza);
}

document.querySelector("#menu-icon").addEventListener("click", helyreAllit);
document.querySelector("#menu-icon").addEventListener("touchend", helyreAllit);

function helyreAllit(){
  lista1.style.left = "0";
  for (const elem of lista1elemek){
    elem.style.textDecoration = "none";
    elem.style.visibility = "visible";
  }
  for(const elem of lista2listak){
    elem.classList.remove("onmobile2");
    elem.classList.remove("ontablet2");
  }
}

function fixalj(evt) {
  for (const elem of lista1elemek){
    elem.style.textDecoration = "none";
  }
  for(const elem of lista2listak){
    elem.style.justifyContent = "center";
  }
  if ((window.innerWidth <= 1150 || window.screen.width <= 1150) && (window.innerWidth > 450 || window.screen.width > 450)) {
      evt.target.style.textDecoration = "underline";
      evt.target.nextElementSibling.classList.add("ontablet2");
  }
  if(window.innerWidth <= 450 || window.screen.width <= 450) {
    for(const elem of lista1elemek){
      elem.style.visibility = "hidden";
    }
    evt.target.nextElementSibling.classList.add("onmobile2");
    evt.target.nextElementSibling.style.display = "flex";
   }
}

function vissza(evt){
  for(const elem of lista2listak){
    elem.classList.remove("onmobile2");
    elem.style.display = "none";
  }
  for(const elem of lista1elemek){
    elem.style.visibility = "visible";
  }
}

const kereseskep = document.getElementById("kereses");
if(window.innerWidth <= 1150 || window.screen.width <= 1150){
  kereseskep.src="css/searchiconmt.png";
}
