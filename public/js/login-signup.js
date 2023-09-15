const formContainer = document.querySelector("#login-signup-form-container");
const userCheckbox = document.querySelector("#login-signup");
const userForms = document.querySelectorAll(
  "#login-signup-form-container form"
);
const userButtons = document.querySelectorAll("#user-btns button");
for (const btn of userButtons) {
  btn.addEventListener("click", formChange);
  btn.addEventListener("touchstart", formChange);
}
userCheckbox.addEventListener("click", userForm);
userCheckbox.addEventListener("touchstart", userForm);
const szoveg = document.querySelector("#login-signup ~ label p");
function userForm(evt) {
  userButtons[0].style.flexGrow = "1";
  userButtons[0].style.backgroundColor = "white";
  userButtons[0].style.color = "#91b0b2";
  userButtons[1].style.flexGrow = "0";
  userButtons[1].style.backgroundColor = "#91b0b2";
  userButtons[1].style.color = "white";
  userForms[0].classList.remove("user-form-inactive");
  userForms[0].classList.add("user-form-active");
  userForms[1].classList.add("user-form-inactive");
  userForms[1].classList.remove("user-form-active");
  if (userCheckbox.checked) {
    document.querySelector("#login-signup ~ label img").src = "css/close.png";
    szoveg.innerHTML = "Close";
    szoveg.style.margin = "21.5px 15px";
  } else {
    document.querySelector("#login-signup ~ label img").src = "css/login.png";
    szoveg.innerHTML = "\n      Login or <br>\n      sign up\n    ";
    szoveg.style.margin = "10px 15px";
  }
}
function formChange(evt) {
  for (let i = 0; i < 2; i++) {
    if (userButtons[i] == evt.target) {
      userButtons[i].style.flexGrow = "1";
      userButtons[i].style.backgroundColor = "white";
      userButtons[i].style.color = "#91b0b2";
      userForms[i].classList.remove("user-form-inactive");
      userForms[i].classList.add("user-form-active");
      if (userForms[i].id == "signup-form") {
        formContainer.style.paddingBottom = "15vh";
        userForms[i].style.height = "445px";
      } else {
        formContainer.style.paddingBottom = "25vh";
        userForms[i].style.height = "370px";
      }
    } else {
      userButtons[i].style.flexGrow = "0";
      userButtons[i].style.backgroundColor = "#91b0b2";
      userButtons[i].style.color = "white";
      userForms[i].classList.remove("user-form-active");
      userForms[i].classList.add("user-form-inactive");
    }
  }
}

const countryResidence = document.querySelector(
  'datalist[id="country-residence"]'
);
for (const orszag of countryCodes) {
  let option = document.createElement("option");
  option.value = orszag.name;
  countryResidence.appendChild(option);
}

const respCie = document.querySelector('textarea[id="resp-cie"]');
respCie.addEventListener("focusin", respEditor);
respCie.addEventListener("focusout", closeCIEditor);

function respEditor() {
  respCie.placeholder =
    "You can describe your responsibilities in Chess and Education up to 400 characters. Touch or click anywhere outside the white box to exit editing. Do not click the close button if you want to submit your registration.";
}

function closeCIEditor() {
  respCie.placeholder = "Writing is optional. ;)";
}
