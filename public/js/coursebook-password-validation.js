const passwordForm = document.getElementById("coursebook-password-form");
const submitButton = document.getElementById("coursebook-password-button");
const passwordInput = document.getElementById("coursebook-password");
const coursebookPasswordError = document.getElementById(
  "coursebook-password-error"
);

function passwordErrorText() {
  if (passwordInput.validity.valueMissing) {
    coursebookPasswordError.textContent = "You need to enter a password.";
  }

  if (passwordInput.validity.tooLong) {
    coursebookPasswordError.textContent = "You need to enter a password.";
  }

  coursebookPasswordError.classList.add("active");
  passwordInput.classList.add("invalid");
}

passwordForm.addEventListener("submit", (event) => {
  if (!passwordInput.validity.valid) {
    event.preventDefault();
    passwordErrorText();
  }
});

passwordInput.addEventListener("focusout", (event) => {
  if (passwordInput.validity.valid) {
    coursebookPasswordError.textContent = "";
    coursebookPasswordError.classList.remove("active");
    passwordInput.classList.remove("invalid");
  } else {
    passwordErrorText();
  }
});
