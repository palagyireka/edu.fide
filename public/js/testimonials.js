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

const tul = document.querySelector(".tesul");
if (tul) {
  allTestimonials.forEach((tes) => {
    const option = document.createElement("option");
    option.innerText = `${tes.name}: ${tes.text}`;
    option.value = JSON.stringify(tes); // Store the entire testimonial object as the option value
    tul.appendChild(option);
  });
  const inputs = document.querySelectorAll("#add-tes input");
  const addbtn = document.querySelector("button#add-tes");
  const delbtn = document.querySelector("#delete-tes");
  const updatebtn = document.querySelector("#update-tes");
  const cancelbtn = document.querySelector("#cancel-tes");
  let latestid = "";
  tul.addEventListener("change", () => {
    const selectedTestimonial = JSON.parse(tul.value); // Retrieve the selected testimonial object
    inputs[0].value = selectedTestimonial.name;
    inputs[1].value = selectedTestimonial.text;
    inputs[2].value = selectedTestimonial.date;
    latestid = selectedTestimonial._id;
    cancelbtn.disabled = false;
    delbtn.disabled = false;
    updatebtn.disabled = false;
    addbtn.disabled = true;
  });
  cancelbtn.addEventListener("click", () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  });
  addbtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const nameContent = inputs[0].value;
    const dateContent = inputs[2].value;
    const textContent = inputs[1].value;
    let courseContent;
    if (potP) {
      courseContent = "POT";
    } else {
      courseContent = "POL";
    }
    const postData = {
      name: nameContent,
      date: dateContent,
      text: textContent,
      course: courseContent,
    };
    fetch(`/testimonials/addmember`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        if (potP) {
          window.location.replace("/testimonials/pot");
        } else {
          window.location.replace("/testimonials/pol");
        }
      })
      .catch(() => {
        if (potP) {
          window.location.replace("/testimonials/pot");
        } else {
          window.location.replace("/testimonials/pol");
        }
      });
  });
  updatebtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const nameContent = inputs[0].value;
    const dateContent = inputs[2].value;
    const textContent = inputs[1].value;
    let id = encodeURIComponent(latestid);
    let courseContent;
    if (potP) {
      courseContent = "POT";
    } else {
      courseContent = "POL";
    }
    const postData = {
      name: nameContent,
      date: dateContent,
      text: textContent,
      course: courseContent,
    };

    fetch(`/testimonials/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        if (potP) {
          window.location.replace("/testimonials/pot");
        } else {
          window.location.replace("/testimonials/pol");
        }
      })
      .catch(() => {
        if (potP) {
          window.location.replace("/testimonials/pot");
        } else {
          window.location.replace("/testimonials/pol");
        }
      });
  });

  delbtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let id = encodeURIComponent(latestid);
    const postData = {};
    fetch(`/testimonials/update/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        if (potP) {
          window.location.replace("/testimonials/pot");
        } else {
          window.location.replace("/testimonials/pol");
        }
      })
      .catch(() => {
        if (potP) {
          window.location.replace("/testimonials/pot");
        } else {
          window.location.replace("/testimonials/pol");
        }
      });
  });
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
  piece.setAttribute("data", babuk[Math.floor(Math.random() * 6)]);
});

const flipCardBacks = document.querySelectorAll(".flip-card-back");
let usedTestimonials = [{}];
let unusedTestimonials = allTestimonials.filter(
  (test) => !usedTestimonials.includes(test)
);

document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const cardBack = card.querySelector(".flip-card-back");
    if (usedTestimonials.length < allTestimonials.length) {
      const random = Math.floor(Math.random() * unusedTestimonials.length);
      const rTest = unusedTestimonials[random];
      cardBack.children[0].innerText = rTest.name;
      cardBack.children[1].innerText = rTest.text;
      cardBack.children[2].innerText = rTest.date;
      usedTestimonials.push(rTest);
      unusedTestimonials.splice(random, 1);
    } else {
      usedTestimonials = [];
      unusedTestimonials = allTestimonials.slice(); // Make a copy of allTestimonials
    }
  });
});

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
