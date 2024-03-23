document.addEventListener("DOMContentLoaded", (event) => {
  const socMed = document.querySelector("#socmed-container");
  const FIDEref = document.querySelector("#fidelogo").parentElement;
  const logoCont = document.querySelector(".logo-container");
  const loginSignup = document.querySelector(`label[for="login-signup"] div`);
  const profileLogout = document.querySelector("div.profile-logout");
  function socmedAllit() {
    if (
      window.innerWidth > 1200 &&
      window.screen.width > 1200 &&
      window.outerWidth > 1200
    ) {
      socMed.remove();
      logoCont.insertBefore(socMed, FIDEref);
    } else {
      socMed.remove();
      if (loginSignup) {
        loginSignup.appendChild(socMed);
      } else if (profileLogout) {
        profileLogout.appendChild(socMed);
      }
    }
  }
  socmedAllit();
  window.addEventListener("resize", socmedAllit);
});
