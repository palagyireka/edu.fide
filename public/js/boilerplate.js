const socmedContainer = document.querySelector("#socmed-container");
const profileLogout = document.querySelector(".profile-logout")
  ? document.querySelector(".profile-logout")
  : document.querySelector(".login-signup > div");
const logoContainer = document.querySelector(".logo-container");

function replaceSocmed() {
  if (window.innerWidth <= 768) {
    if (profileLogout) {
      profileLogout.insertBefore(
        socmedContainer,
        profileLogout.lastElementChild
      );
    }
  } else {
    logoContainer.insertBefore(socmedContainer, logoContainer.lastElementChild);
  }
}
replaceSocmed();

window.addEventListener("resize", replaceSocmed);
