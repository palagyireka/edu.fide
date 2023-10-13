const alert = document.querySelector(".flash");
const alertButtons = document.querySelectorAll(".flash button");

function removeFadeOut(el, speed) {
  var seconds = speed / 1000;
  el.style.transition = "opacity " + seconds + "s ease";

  el.style.opacity = 0;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, speed);
}

if (alertButtons) {
  alertButtons.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      if (btn.parentNode.classList.contains("flash-verify")) {
        const timeToAdd = 1000 * 60 * 60 * 24;
        const date = new Date();
        const expiryTime = parseInt(date.getTime()) + timeToAdd;
        date.setTime(expiryTime);
        const utcTime = date.toUTCString();

        document.cookie = `verifyClosed=true; expires=${utcTime}`;
      }

      removeFadeOut(alert, 200);
    });
  });
}
