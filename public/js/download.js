const textBooks = [
  { value: "textbooks" },
  {
    author: "Shamin De Moraes",
    title: "Learning Chess - Lessons For Beginners",
    lang: "English",
    source: "https://designrr.page?id=307576&token=3996775652&type=FP&h=5814",
  },
  {
    author: "World Chess Federation",
    title: "Planet Chess",
    lang: "English",
    source: "https://designrr.page/?id=307578&token=2373308709&type=FP&h=7874",
  },
  {
    author: "World Chess Federation",
    title: "Planet Chess",
    lang: "Spanish",
    source: "https://designrr.page/?id=307583&token=537703293&type=FP&h=8238",
  },
  {
    author: "World Chess Federation",
    title: "Planet Chess",
    lang: "Russian",
    source: "https://designrr.page/?id=307582&token=3682180137&type=FP&h=9070",
  },
  {
    author: "World Chess Federation",
    title: "Planet Chess",
    lang: "French",
    source: "https://designrr.page/?id=307580&token=3999049914&type=FP&h=5180",
  },
  {
    author: "World Chess Federation",
    title: "Planet Chess",
    lang: "Arabic",
    source: "https://designrr.page/?id=307579&token=229452726&type=FP&h=7438",
  },
  {
    author: "Dr. Olgun Kulaç",
    title: "Elementary Level Chess Class Book",
    lang: "English",
    source: "https://designrr.page/?id=307433&token=955446255&type=FP&h=4706",
  },
  {
    author: "Dr. Olgun Kulaç",
    title: "Elementary Level Chess Class Book",
    lang: "French",
    source: "https://designrr.page/?id=307436&token=1760038781&type=FP&h=5466",
  },
  {
    author: "Dr. Olgun Kulaç",
    title: "Elementary Level Chess Class Book",
    lang: "Arabic",
    source: "https://designrr.page/?id=307254&token=2334004516&type=FP&h=7544",
  },
  {
    author: "",
    title: "Chess: The First Year Of Study - Workbook",
    lang: "English",
    source: "https://designrr.page/?id=307573&token=2933305916&type=FP&h=2286",
  },
  {
    author: "",
    title: "Chess: The First Year Of Study - Workbook",
    lang: "Russian",
    source: "https://designrr.page/?id=307575&token=1759856226&type=FP&h=5706",
  },
];

const eduBrochure = [
  { value: "brochures" },
  {
    title: "Chess In Education Brochure 2023 I.",
    lang: "English",
    source: "https://designrr.page/?id=299931&token=2492681357&type=FP&h=5162",
  },
  {
    title: "Chess In Education Brochure 2023 II.",
    lang: "English",
    source: "https://designrr.page/?id=307607&token=3114595230&type=FP&h=3808",
  },
  {
    title: "Chess In Education Brochure 2023 III.",
    lang: "English",
    source: "https://designrr.page/?id=299930&token=3083831957&type=FP&h=9316",
  },
  {
    title: "Chess: A Tool For Education",
    lang: "English",
    source: "https://designrr.page/?id=307253&token=1342587586&type=FP&h=4580",
  },
  {
    title: "Chess: A Tool For Education",
    lang: "German",
    source: "https://designrr.page/?id=307252&token=2233593594&type=FP&h=5610",
  },
  {
    title: "Chess: A Tool For Education",
    lang: "French",
    source: "https://designrr.page/?id=307250&token=1897213951&type=FP&h=5692",
  },
];

const cieBooks = [
  { value: "ciebooks" },
  {
    author: "Dr. Uvencio Blanco Hernández",
    title: "CAPABLANCA and HIS METHOD",
    lang: "English",
    source: "https://designrr.page/?id=307248&token=1061222588&type=FP&h=7556",
  },
  {
    author: "Dr. Uvencio Blanco Hernández",
    title: "Capablanca Y Su Método",
    lang: "Spanish",
    source: "https://designrr.page/?id=307917&token=2642103792&type=FP&h=5984",
  },
];

const otherMaterial = [{ value: "other" }];

const allCategories = [textBooks, eduBrochure, cieBooks, otherMaterial];

const catLabels = document.querySelectorAll(".categories label");
const background = document.querySelector(".background");
let hoverActive = false;

window.addEventListener("scroll", (evt) => {
  if (hoverActive) {
    background.style.display = "none";
  }
});

catLabels.forEach((lbl) => {
  lbl.addEventListener("mouseenter", (evt) => {
    hoverActive = true;
    background.style.left = `${lbl.offsetLeft}px`;
    background.style.top = `${lbl.offsetTop - window.scrollY}px`;
    background.style.display = "block";
    background.style.height = window
      .getComputedStyle(lbl)
      .getPropertyValue("height");
    background.style.width = window
      .getComputedStyle(lbl)
      .getPropertyValue("width");
  });
  lbl.addEventListener("mouseleave", (evt) => {
    background.style.width = "0px";
  });
  lbl.addEventListener("click", (evt) => {
    for (const objectArray of allCategories) {
      if (objectArray[0].value == lbl.getAttribute("for")) {
        // console.log(`The match is ${objectArray[0].value}`);
        if (document.querySelector(".materials tbody")) {
          document.querySelector(".materials tbody").remove();
        }
        const tbody = document.createElement("tbody");
        for (let i = 1; i < objectArray.length; i++) {
          const row = document.createElement("tr");
          const authortd = document.createElement("td");
          if (objectArray[i].author) {
            authortd.innerText = objectArray[i].author;
          }
          const titletd = document.createElement("td");
          titletd.innerText = objectArray[i].title;
          const langtd = document.createElement("td");
          langtd.innerText = objectArray[i].lang;
          row.appendChild(authortd);
          row.appendChild(titletd);
          row.appendChild(langtd);
          tbody.appendChild(row);
          row.addEventListener("click", (evt) => {
            if (
              row.nextElementSibling &&
              row.nextElementSibling.firstChild &&
              row.nextElementSibling.firstChild.firstChild.tagName == "IFRAME"
            ) {
              row.nextElementSibling.remove();
            } else {
              const iframe = Object.assign(document.createElement("iframe"), {
                src: objectArray[i].source,
                allowFullscreen: true,
                frameBorder: "0",
              });
              const newRow = document.createElement("tr");
              const newData = document.createElement("td");
              newData.classList.add("iframe-row");
              newData.colSpan = row.cells.length;
              newData.appendChild(iframe);
              newRow.appendChild(newData);
              tbody.insertBefore(newRow, row.nextElementSibling);
            }
          });
        }
        document.querySelector("table.materials").appendChild(tbody);
        document.querySelector("table.materials").style.opacity = "1";
      }
    }
  });
});
