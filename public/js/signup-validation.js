const form = document.getElementById("signup-form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("nuser-email");
const password = document.getElementById("nuser-password");
const nameError = document.querySelector(".name-error");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");

function validateInput(input, error) {
  input.addEventListener("focusout", (event) => {
    if (input.validity.valid) {
      error.textContent = "";
      error.classList.remove("active");
      input.classList.remove("invalid");
    } else {
      showError(input);
      showLoginError(input);
    }
  });
}

form.addEventListener("submit", (event) => {
  if (
    !firstName.validity.valid ||
    !lastName.validity.valid ||
    !email.validity.valid ||
    !password.validity.valid
  ) {
    event.preventDefault();
  }
  if (!firstName.validity.valid) {
    showError(firstName);
  }
  if (!lastName.validity.valid) {
    showError(lastName);
  }
  if (!email.validity.valid) {
    showError(email);
  }
  if (!password.validity.valid) {
    showError(password);
  }
});

function showError(inputType) {
  switch (inputType) {
    case firstName:
      firstNameErrorText();
      break;
    case lastName:
      lastNameErrorText();
      break;
    case email:
      emailErrorText();
      break;
    case password:
      passwordErrorText();
      break;
  }
}

function firstNameErrorText() {
  if (firstName.validity.valueMissing) {
    nameError.textContent = "You need to enter your name.";
  }

  nameError.classList.add("active");
  firstName.classList.add("invalid");
}

function lastNameErrorText() {
  if (lastName.validity.valueMissing) {
    nameError.textContent = "You need to enter your name.";
  }

  nameError.classList.add("active");
  lastName.classList.add("invalid");
}

function emailErrorText() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters.`;
  }

  emailError.classList.add("active");
  email.classList.add("invalid");
}

function passwordErrorText() {
  if (password.validity.valueMissing) {
    passwordError.textContent = "You need to enter a password.";
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Password should be at least ${password.minLength} characters.`;
  }

  passwordError.classList.add("active");
  password.classList.add("invalid");
}

validateInput(firstName, nameError);
validateInput(lastName, nameError);
validateInput(email, emailError);
validateInput(password, passwordError);
