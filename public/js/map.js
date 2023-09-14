const element = document.querySelector("#map");
var panZoomMap = svgPanZoom(element, {
  zoomEnabled: true,
  controlIconsEnabled: true,
  fit: true,
  center: true,
  minZoom: 1,
  maxZoom: 8,
  zoomScaleSensitivity: 0.2,
});

// MAP

// if (window.innerWidth <= 1117) {
//   instance.zoomTo(180, 70, 1.4);
// } else {
//   instance.zoomTo(350, 70, 1.7);
// }

const paths = document.querySelectorAll("#map .sm_state");
const hoverText = document.querySelector("#hover-text");

paths.forEach((item) => {
  const countryCode = item.classList[1].slice(-2);
  let country = "";
  let website = "";
  let contact = "";
  let email = "";

  for (let i = 0; i < countryCodes.length; i++) {
    if (countryCodes[i]["alpha-2"] === countryCode) {
      country = countryCodes[i].name;
      website = countryCodes[i].website;
      contact = countryCodes[i].contact;
      email = countryCodes[i].email;
      break;
    }
  }

  item.addEventListener("click", orszagValaszt);
  item.addEventListener("touchstart", orszagValaszt);

  function orszagValaszt(evt) {
    const selectedCountry = document.querySelector(".selected");
    const searchedCountry = document.querySelector(".selected-country");

    if (selectedCountry) {
      selectedCountry.classList.remove("selected");
    }
    evt.target.classList.add("selected");

    if (searchedCountry) {
      searchedCountry.classList.remove("selected-country");
    }

    document.querySelector(".text-box").classList.remove("shown-country-menu");
    document.querySelector("#country-name").checked = true;

    let countryContacts = document.querySelectorAll("#country-contacts li");
    const fedContacts = document.querySelector("#country-contacts");
    if (countryContacts.length < 3) {
      let counter = 3 - countryContacts.length;
      for (let i = 0; i < counter; i++) {
        const listItem = document.createElement("li");
        fedContacts.appendChild(listItem);
      }
    }
    countryContacts = document.querySelectorAll("#country-contacts li");
    if (countryContacts[0]) countryContacts[0].innerText = website;
    if (countryContacts[1]) countryContacts[1].innerText = contact;
    if (countryContacts[2]) countryContacts[2].innerText = email;
    for (const cont of countryContacts) {
      if (cont.innerText == "") {
        cont.remove();
      }
    }
    const text = document.querySelector("#country-name ~ label");
    text.classList.add("hidden");
    setTimeout(() => {
      text.innerText = country;
    }, 200);
    setTimeout(() => {
      text.classList.remove("hidden");
    }, 200);
  }

  // ------------HOVER------------

  const UKCopy = document.getElementById("UKcopy");
  UKCopy.classList.add("hidden");

  item.addEventListener("mousemove", (event) => {
    if (item.id == "path435") {
      UKCopy.classList.remove("hidden");
    }
    hoverText.querySelector("span").textContent = country;
    hoverText.classList.remove("hidden");
    hoverText.style.top = event.clientY + "px";
    hoverText.style.left = event.clientX + "px";
  });

  item.addEventListener("mouseleave", () => {
    if (item.id == "UKcopy") {
      UKCopy.classList.add("hidden");
    }
    hoverText.classList.add("hidden");
  });
});

// COUNTRY SEARCH

const list = document.querySelector(".search-countries");

function zoomIn(path) {
  const selectedCountry = document.querySelector(".selected");
  const tBBox = path.getBBox();
  const previousBBox = selectedCountry.getBBox();
  const xDifference = Math.abs(tBBox.x - previousBBox.x);
  const yDifference = Math.abs(tBBox.x - previousBBox.x);
  const tViewport = document.querySelector("g.svg-pan-zoom_viewport");

  if (xDifference > 0 || yDifference > 0) {
    panZoomMap.reset();
    tViewport.classList.add("zoom");
    setTimeout(() => {
      tViewport.classList.remove("zoom");
    }, 1000);
  }

  setTimeout(() => {
    var tViewport = document.querySelector("g.svg-pan-zoom_viewport");
    var tMatrix = tViewport.transform.baseVal.getItem(0).matrix;
    var tPoint = {
      x: tBBox.x - 750 + tBBox.width / 2,
      y: tBBox.y - 250 + tBBox.height / 2,
    };

    panZoomMap.zoomAtPoint(1.5, tPoint);
  }, 5);
}

for (let country of countryCodes) {
  const listItem = document.createElement("li");
  listItem.innerText = country.name;

  listItem.addEventListener("click", () => {
    const item = document.querySelector(`.sm_state_${country["alpha-2"]}`);
    zoomIn(item);
    item.dispatchEvent(new Event("click"));
  });
  list.appendChild(listItem);
}

const listItems = document.querySelectorAll(".search-countries li");
const filter = document.querySelector(".searchbar input");
const searchIcon = document.querySelector(".bi-search");
const cancelIcon = document.querySelector(".bi-x");

listItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    cancelIcon.classList.remove("hidden");
    searchIcon.classList.add("hidden");
    listItems.forEach((i) => {
      i.classList.remove("selected-country");
      if (i === event.target) {
        i.classList.add("selected-country");
      } else {
        i.setAttribute("hidden", "");
      }
    });
  });
});

filter.addEventListener("keyup", (event) => {
  const filterValue = event.target.value.toUpperCase();

  if (filterValue != "") {
    searchIcon.classList.add("hidden");
    cancelIcon.classList.remove("hidden");
  } else {
    searchIcon.classList.remove("hidden");
    cancelIcon.classList.add("hidden");
  }

  for (let item of listItems) {
    text = item.innerText.toUpperCase();
    if (text.indexOf(filterValue) > -1) {
      item.removeAttribute("hidden");
    } else {
      item.setAttribute("hidden", "");
    }
  }
});

cancelIcon.addEventListener("click", () => {
  filter.value = "";
  filter.dispatchEvent(new Event("keyup"));
});

// SIDEMENU STUFF

const countryNameChB = document.querySelector("#country-name");
const countryNameLBL = document.querySelector(`label[for="country-name"]`);
const textBox = document.querySelector(".text-box");
countryNameLBL.addEventListener("click", (evt) => {
  if (!countryNameChB.checked) {
    textBox.classList.add("shown-country-menu");
  } else {
    textBox.classList.remove("shown-country-menu");
  }
});
countryNameChB.addEventListener("click", (evt) => {
  if (!countryNameChB.checked) {
    textBox.classList.add("shown-country-menu");
  } else {
    textBox.classList.remove("shown-country-menu");
  }
});
