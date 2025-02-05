const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("user-email");
const loginPassword = document.getElementById("user-password");
const loginEmailError = document.querySelector(".login-email-error");
const loginPasswordError = document.querySelector(".login-password-error");

loginForm.addEventListener("submit", (event) => {
  if (!loginEmail.validity.valid || !loginPassword.validity.valid) {
    event.preventDefault();
  }
  if (!loginEmail.validity.valid) {
    showLoginError(loginEmail);
  }
  if (!loginPassword.validity.valid) {
    showLoginError(loginPassword);
  }
});

function showLoginError(inputType) {
  switch (inputType) {
    case loginEmail:
      loginEmailErrorText();
      break;
    case loginPassword:
      loginPasswordErrorText();
      break;
  }
}

function loginEmailErrorText() {
  if (loginEmail.validity.valueMissing) {
    loginEmailError.textContent = "You need to enter your email adress.";
  }

  loginEmailError.classList.add("active");
  loginEmail.classList.add("invalid");
}

function loginPasswordErrorText() {
  if (loginPassword.validity.valueMissing) {
    loginPasswordError.textContent = "You need to enter your password.";
  } else if (loginPassword.validity.tooShort) {
    loginPasswordError.textContent = `Password should be at least ${loginPassword.minLength} characters.`;
  }
  //  else {
  //   loginPasswordError.textContent =
  //     "Your password should contain one capital letter, one number and one special character (+ - * / etc).";
  // }

  loginPasswordError.classList.add("active");
  loginPassword.classList.add("invalid");
}

validateInput(loginEmail, loginEmailError);
validateInput(loginPassword, loginPasswordError);
