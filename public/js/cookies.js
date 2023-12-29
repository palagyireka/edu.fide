const acceptButton = document.getElementById("accept-cookies");
const acceptEssentialButton = document.getElementById(
  "accept-essential-cookies"
);
const cookieWarning = document.getElementById("cookie-warning");

const acceptWarning = () => {
  document.cookie = "cookiesAccepted=true";
  cookieWarning.hidden = true;
};

acceptButton.addEventListener("click", acceptWarning);
acceptEssentialButton.addEventListener("click", acceptWarning);

const cookieIcon = document.getElementById("cookies");
const cookiesDesc = document.querySelector(".cookies-desc");

cookieIcon.addEventListener("click", () => {
  cookiesDesc.classList.toggle("hidden");
});
