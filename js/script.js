const lista2listak = document.getElementsByClassName("lista-2");
const lista2elemek = document.querySelectorAll(".lista-2 > li");
const lista1 = document.querySelector(".lista-1");
const lista1elemek = document.querySelectorAll(".lista-1 > li");
lista2listak[0].style.justifyContent = "left";
lista2listak[1].style.justifyContent = "left";
lista2listak[5].style.justifyContent = "right";
lista2listak[4].style.justifyContent = "right";

for(const elem of lista1elemek){
  elem.addEventListener("click", fixalj);
  elem.addEventListener("touchend", fixalj);
}

document.querySelector("#menu-icon").addEventListener("click", helyreAllit);

function helyreAllit(){
  lista1.style.left = "0";
  for (const elem of lista1elemek){
    elem.style.textDecoration = "none";
  }
}

function fixalj(evt) {
  console.log(evt);
  for (const elem of lista1elemek){
    elem.style.textDecoration = "none";
  }
  for(const elem of lista2elemek){
    elem.style.justifyContent = "center";
  }
  if ((window.innerWidth <= 1150 || window.screen.width <= 1150) && (window.innerWidth > 450 || window.screen.width > 450)) {
      evt.target.style.textDecoration = "underline";
  }
  if(window.innerWidth <= 450 || window.screen.width <= 450) {
    lista1.style.left = "-999px";
    console.log(evt.target.nextElementSibling);
    evt.target.nextElementSibling.classList.add("onmobile2");
   }
}

const kereseskep = document.getElementById("kereses");
if(window.innerWidth <= 1150 || window.screen.width <= 1150){
  kereseskep.src="css/searchiconmt.png";
}
