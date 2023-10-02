const alert = document.querySelector(".flash");
const alertButtons = document.querySelector(".flash button");
const verifyButton = document.querySelector(".flash-verify button");

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
    btn.addEventListener("click", () => {
      removeFadeOut(alert, 200);
    });
  });
}

verifyButton.addEventListener("click", () => {
  var timeToAdd = 1000 * 60 * 60 * 24;
  var date = new Date();
  var expiryTime = parseInt(date.getTime()) + timeToAdd;
  date.setTime(expiryTime);
  var utcTime = date.toUTCString();

  document.cookie = `verifyClosed=true; expires=${utcTime}`;
});
