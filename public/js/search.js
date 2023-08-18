var orszagLista = document.getElementById("orszag-search");
for (const orszag of countryCodes) {
  let option = document.createElement("option");
  option.text = orszag.name;
  orszagLista.add(option);
}

const keresoSav = document.querySelector("#search");
keresoSav.addEventListener("click", (evt) => {
  evt.target.parentElement.style.width = "45%";
});
keresoSav.addEventListener("focusout", (evt) => {
  evt.target.parentElement.style.width = "35%";
});

const searchMain = document.getElementById("searchpm");

for (const elem of lista1elemek) {
  elem.addEventListener("mouseover", leKuld);
  elem.addEventListener("mouseout", viKuld);
}
for (const elem of lista2elemek) {
  elem.addEventListener("mouseover", leKuld);
  elem.addEventListener("mouseout", viKuld);
}
function leKuld() {
  searchMain.style.top = "32vh";
}
function viKuld() {
  searchMain.style.top = "25vh";
}
