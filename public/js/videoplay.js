function randomSzam(max) {
  return Math.floor(Math.random() * max);
}

const videoLinkek = [
  "https://www.youtube.com/embed/PwUJz7J0Oqw",
  "https://www.youtube.com/embed/TO63aZI7GLI",
  "https://www.youtube.com/embed/s2FP1aLv3gM",
  "https://www.youtube.com/embed/QUVVsLuRN0E",
  "https://www.youtube.com/embed/-Xq-a4YMT_s",
  "https://www.youtube.com/embed/H_71NB6i46Y",
  "https://www.youtube.com/embed/L7GV3oRLtTo",
  "https://www.youtube.com/embed/nDbcs3ApXp4",
  "https://www.youtube.com/embed/XJjLv6A7pzE",
  "https://www.youtube.com/embed/30UyoFU7iOQ",
];

const vContainer = document.querySelector(".v-container");
const vInput = document.querySelector("#videop");
const vLabel = document.querySelector('label[for="videop"]');
const videoPlayer = document.getElementById("random-video-player");
const closeBtn = vContainer.querySelector("button");
closeBtn.addEventListener("click", (evt) => {
  vContainer.classList.remove("videoactive");
  vInput.checked = false;
  videoPlayer.src = "";
});

setTimeout(inditsVideot, 3000);

function inditsVideot() {
  if (vInput.checked) {
    videoPlayer.src = videoLinkek[randomSzam(videoLinkek.length)];
    vContainer.classList.add("videoactive");
  }
}
