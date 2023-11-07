const acceptButton = document.getElementById("accept-cookies");
const cookieWarning = document.getElementById("cookie-warning");

const acceptWarning = () => {
  document.cookie = "cookiesAccepted=true";
  cookieWarning.hidden = true;
};

acceptButton.addEventListener("click", acceptWarning);
