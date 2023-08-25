const broFlipbook = document.getElementById("brochure-flipbook");
const themeSwitch = document.querySelector(".theme-switch");
const themeCheckbox = document.querySelector("#theme-input");

themeSwitch.addEventListener("click", (evt) => {
  console.log(evt);
  if (themeCheckbox.checked) {
    broFlipbook.src =
      "https://designrr.page?id=299930&token=3083831957&type=FP&h=4244";
  } else {
    broFlipbook.src =
      "https://designrr.page?id=299931&token=2492681357&type=FP&h=4010";
  }
});
