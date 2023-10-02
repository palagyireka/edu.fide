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
  fetch;
});
