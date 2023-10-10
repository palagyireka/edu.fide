var orszagLista = document.getElementById("orszag-search");
for (const orszag of countryCodes) {
  let option = document.createElement("option");
  option.text = orszag.name;
  orszagLista.add(option);
}
