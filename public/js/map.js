const element = document.querySelector("#map");
const featuredMenu = document.querySelector("#featured");
var panZoomMap = svgPanZoom(element, {
  zoomEnabled: true,
  controlIconsEnabled: true,
  fit: true,
  center: true,
  minZoom: 1,
  maxZoom: 8,
  zoomScaleSensitivity: 0.4,
});

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

    document.querySelector(
      "#country-gallery"
    ).href = `/gallery?country=${country}`;
    const cText = document.querySelector(".country-name");
    cText.classList.add("hidden");
    const anchorTags = document.querySelectorAll(
      ".country-menu li:nth-of-type(2) ul li a"
    );
    anchorTags[0].href = `/titleholders/si?country=${country}`;
    anchorTags[1].href = `/titleholders/lsi?country=${country}`;
    setTimeout(() => {
      cText.innerText = country;
    }, 200);
    setTimeout(() => {
      cText.classList.remove("hidden");
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
