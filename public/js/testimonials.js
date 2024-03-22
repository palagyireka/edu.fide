let allTestimonials = JSON.parse(
  document.querySelector("div.tes-data").dataset.t
);

const potP = document.querySelector("#potp") ? "POT" : false;
const polP = document.querySelector("#polp") ? "POL" : false;

loadTestimonials(potP);
loadTestimonials(polP);

function loadTestimonials(slc) {
  if (slc) {
    allTestimonials = allTestimonials.filter((tm) => {
      if (tm.course && tm.course === slc) {
        return tm;
      }
    });
  }
}

const babuk = [
  "/pictures/gyalog.svg",
  "/pictures/lovag.svg",
  "/pictures/kiraly.svg",
  "/pictures/kiralyno.svg",
  "/pictures/futo.svg",
  "/pictures/bastya.svg",
];

document.querySelectorAll(".chess-pieces").forEach((piece) => {
  piece.data = babuk[Math.floor(Math.random() * 6)];
});

const flipCards = document.querySelectorAll(".flip-card-page");
// let usedTestimonials = [{}];

// flipCards.forEach((card) => {
//   let remainingTestimonials = allTestimonials.filter(
//     (testimonial) => !usedTestimonials.includes(testimonial)
//   );
//   if (remainingTestimonials.length === 0) {
//     return;
//   }

//   let randomNumber = Math.floor(Math.random() * remainingTestimonials.length);
//   const randomTestimonial = remainingTestimonials[randomNumber];
//   if (!randomTestimonial) {
//     // If randomTestimonial is undefined, return early to avoid errors
//     return;
//   }
//   card.children[0].innerText = randomTestimonial.name;
//   card.children[1].innerText = randomTestimonial.text;
//   card.children[2].innerText = randomTestimonial.date;
//   usedTestimonials.push(randomTestimonial);
// });

// const inners = document.querySelectorAll(".flip-card-inner");
// for (let i = 0; i < 1000; i++) {
//   setTimeout(function () {
//     document.querySelectorAll(".turned").forEach((turned) => {
//       turned.classList.remove("turned");
//     });
//     inners[Math.floor(Math.random() * inners.length)].classList.add("turned");
//     inners[Math.floor(Math.random() * inners.length)].classList.add("turned");
//   }, i * 2500);
// }
