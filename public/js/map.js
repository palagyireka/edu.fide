const mapNoti = document.querySelector("#world-map-noti");
mapNoti.addEventListener("click", (evt) => {
  window.alert(
    "Our world map is for illustration only to show country-specific Chess in Education information. The boundaries and the names shown do not represent nor imply official endorsement by FIDE or by any countries or by any national member federations."
  );
});

const worldMap = document.querySelector("svg#map");
const featuredMenu = document.querySelector("#featured");
worldMap.setAttribute("viewBox", "0 0 1902 762");

let isPanning = false;
let startX, startY, viewBoxX, viewBoxY;

worldMap.addEventListener("mousedown", startPan);
worldMap.addEventListener("touchstart", startPan);
worldMap.addEventListener("wheel", handleWheel);
worldMap.addEventListener("touchmove", handleTouchMove);
worldMap.addEventListener("touchend", handleTouchEnd);

let initialScale = null;
// Handle touch move for pinch-to-zoom
function handleTouchMove(event) {
  if (event.touches.length === 2) {
    event.preventDefault();
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (!initialScale) {
      initialScale = distance;
    } else {
      const scale = (distance / initialScale) * 0.1;
      zoomMap(scale);
    }
  }
}
// Handle touch end to reset initial scale
function handleTouchEnd(event) {
  if (event.touches.length < 2) {
    initialScale = null;
  }
}
// Function to zoom the map based on scale
function zoomMap(scale) {
  let viewBox = worldMap.getAttribute("viewBox").split(" ").map(Number);
  const [x, y, width, height] = viewBox;

  const newWidth = width / scale;
  const newHeight = height / scale;

  if (newWidth > 0 && newHeight > 0) {
    const newX = x - (newWidth - width) / 2;
    const newY = y - (newHeight - height) / 2;

    worldMap.setAttribute(
      "viewBox",
      `${newX} ${newY} ${newWidth} ${newHeight}`
    );
  }
}

function startPan(event) {
  const rect = worldMap.getBoundingClientRect();
  const mouseX = event.clientX - rect.left; // X coordinate of mouse relative to SVG
  const mouseY = event.clientY - rect.top; // Y coordinate of mouse relative to SVG

  // Check if the mouse is within the SVG boundaries
  if (mouseX < 0 || mouseX > rect.width || mouseY < 0 || mouseY > rect.height)
    return;

  isPanning = true;
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;
  startX = clientX;
  startY = clientY;

  const viewBox = worldMap.getAttribute("viewBox").split(" ").map(Number);
  viewBoxX = viewBox[0];
  viewBoxY = viewBox[1];

  worldMap.addEventListener("mousemove", pan);
  worldMap.addEventListener("touchmove", pan);
  worldMap.addEventListener("mouseup", endPan);
  worldMap.addEventListener("touchend", endPan);
}

function pan(event) {
  if (!isPanning) return;
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;

  const dx = startX - clientX;
  const dy = startY - clientY;

  const newViewBoxX = viewBoxX + dx;
  const newViewBoxY = viewBoxY + dy;

  worldMap.setAttribute(
    "viewBox",
    `${newViewBoxX} ${newViewBoxY} ${worldMap.viewBox.baseVal.width} ${worldMap.viewBox.baseVal.height}`
  );
}

function endPan() {
  isPanning = false;
  worldMap.removeEventListener("mousemove", pan);
  worldMap.removeEventListener("touchmove", pan);
  worldMap.removeEventListener("mouseup", endPan);
  worldMap.removeEventListener("touchend", endPan);
}

function handleWheel(event) {
  const rect = worldMap.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  if (mouseX < 0 || mouseX > rect.width || mouseY < 0 || mouseY > rect.height)
    return;
  event.preventDefault();

  const delta = normalizeWheelDelta(event);
  const zoomFactor = 0.1;

  let viewBox = worldMap.getAttribute("viewBox").split(" ").map(Number);
  const [x, y, width, height] = viewBox;

  // Calculate new width and height
  const newWidth = width * (1 - delta * zoomFactor); // Invert delta value here
  const newHeight = height * (1 - delta * zoomFactor); // Invert delta value here

  // Ensure zooming is within limits
  if (newWidth > 0 && newHeight > 0) {
    // Calculate new x and y to keep the viewBox centered
    const newX = x - (newWidth - width) / 2;
    const newY = y - (newHeight - height) / 2;

    worldMap.setAttribute(
      "viewBox",
      `${newX} ${newY} ${newWidth} ${newHeight}`
    );
  }
}

// Normalize wheel delta across different browsers
function normalizeWheelDelta(event) {
  if (event.deltaY === 0) return 0;
  return event.deltaY > 0 ? -1 : 1;
}

const paths = document.querySelectorAll("#map .sm_state");
const hoverText = document.querySelector("#hover-text");

const countryMenuChange = (country, countryCode) => {
  document.querySelector(
    "#country-gallery"
  ).href = `/gallery?country=${country}`;
  const cText = document.querySelector(".country-name");
  // cText.classList.add("hidden");
  const anchorTags = document.querySelectorAll(
    ".country-menu li:nth-of-type(2) ul li a"
  );
  const countryContactA = document.querySelector("#country-contact");
  const countryNewsA = document.querySelector("#country-news");

  setTimeout(() => {
    cText.innerText = country;
    anchorTags[0].href = `/pot/titleholders/si?country=${country}`;
    anchorTags[1].href = `/pot/titleholders/lsi?country=${country}`;
    anchorTags[2].href = `/pot/titleholders/sli?country=${country}`;
    countryContactA.href = `/contact?country=${country}`;
    countryNewsA.href = `/posts?country=${countryCode}`;
  }, 200);
  // setTimeout(() => {
  //   cText.classList.remove("hidden");
  // }, 200);
};

const addCountryFunctions = (userLocation) => {
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

    if (countryCode === userLocation) {
      item.classList.add("selected");
    }

    item.addEventListener("click", orszagValaszt);
    item.addEventListener("touchstart", orszagValaszt);

    function orszagValaszt(evt) {
      const selectedCountry = document.querySelectorAll(".selected");
      const searchedCountry = document.querySelectorAll(".selected-country");
      if (selectedCountry) {
        selectedCountry.forEach((country) => {
          country.classList.remove("selected");
        });
      }
      evt.target.classList.add("selected");
      if (
        window.innerWidth > 1200 &&
        window.screen.width > 1200 &&
        window.outerWidth > 1200
      ) {
        if (evt.target.id == "path435") {
          UKCopy.classList.remove("hidden");
          UKCopy.classList.add("selected");
        }
        if (evt.target.id == "PakistanUp") {
          ChinaUp.classList.add("hidden");
          IndiaUp.classList.add("hidden");
        }
        if (evt.target.id == "ChinaUp") {
          IndiaUp.classList.add("hidden");
          PakistanUp.classList.add("hidden");
        }
        if (evt.target.id == "IndiaUp") {
          ChinaUp.classList.add("hidden");
          PakistanUp.classList.add("hidden");
        }
      } else {
        if (evt.target.id == "path435") {
          UKCopy.classList.remove("hidden");
          UKCopy.classList.add("selected");
        }
        if (evt.target.id == "PakistanDown") {
          PakistanUp.classList.remove("hidden");
          PakistanUp.classList.add("selected");
          IndiaUp.classList.add("hidden");
          ChinaUp.classList.add("hidden");
        }
        if (evt.target.id == "ChinaDown") {
          ChinaUp.classList.remove("hidden");
          ChinaUp.classList.add("selected");
          IndiaUp.classList.add("hidden");
          PakistanUp.classList.add("hidden");
        }
        if (evt.target.id == "IndiaDown") {
          IndiaUp.classList.remove("hidden");
          IndiaUp.classList.add("selected");
          ChinaUp.classList.add("hidden");
          PakistanUp.classList.add("hidden");
        }
      }

      hoverText.querySelector("span").textContent = country;
      hoverText.classList.remove("hidden");
      hoverText.style.top = evt.clientY + "px";
      hoverText.style.left = evt.clientX + "px";

      if (searchedCountry) {
        searchedCountry.forEach((country) => {
          country.classList.remove("selected-country");
        });
      }

      countryMenuChange(country, countryCode);
    }

    // ------------HOVER------------

    const UKCopy = document.getElementById("UKcopy");
    const PakistanUp = document.getElementById("PakistanUp");
    const ChinaUp = document.getElementById("ChinaUp");
    const IndiaUp = document.getElementById("IndiaUp");
    UKCopy.classList.add("hidden");
    PakistanUp.classList.add("hidden");
    ChinaUp.classList.add("hidden");
    IndiaUp.classList.add("hidden");

    item.addEventListener("mousemove", (event) => {
      if (item.id == "path435") {
        UKCopy.classList.remove("hidden");
      }
      if (item.id == "PakistanDown") {
        PakistanUp.classList.remove("hidden");
      }
      if (item.id == "ChinaDown") {
        ChinaUp.classList.remove("hidden");
      }
      if (item.id == "IndiaDown") {
        IndiaUp.classList.remove("hidden");
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
      if (item.id == "PakistanUp" && !item.classList.contains("selected")) {
        PakistanUp.classList.add("hidden");
      }
      if (item.id == "ChinaUp" && !item.classList.contains("selected")) {
        ChinaUp.classList.add("hidden");
      }
      if (item.id == "IndiaUp" && !item.classList.contains("selected")) {
        IndiaUp.classList.add("hidden");
      }
      hoverText.classList.add("hidden");
    });

    item.addEventListener("touchstart", (event) => {});
  });
};

fetch("/api/getip")
  .then((result) => result.json())
  .then((ip) => {
    const locationInfo = JSON.parse(ip);

    addCountryFunctions(locationInfo.country_code);
    countryMenuChange(locationInfo.country_name, locationInfo.country_code);
  });

// COUNTRY SEARCH

const list = document.querySelector(".search-countries");

function zoomIn(path) {
  const selectedCountry = document.querySelector(".selected");
  let pathB = path.getBBox();
  const prevBox = selectedCountry
    ? selectedCountry.getBBox()
    : { x: 0, y: 0, width: 0, height: 0 };
  const aspectRatio =
    worldMap.viewBox.baseVal.width / worldMap.viewBox.baseVal.height;

  let newWidth, newHeight;
  if (pathB.width > pathB.height) {
    newWidth = pathB.width + 350;
    newHeight = newWidth / aspectRatio;
  } else {
    newHeight = pathB.height + 250;
    newWidth = newHeight * aspectRatio;
  }

  const newX = pathB.x - (newWidth - pathB.width) / 2;
  const newY = pathB.y - (newHeight - pathB.height) / 2;
  const moveTo = `${newX} ${newY} ${newWidth} ${newHeight}`;
  gsap.to(worldMap, {
    duration: 0.8,
    attr: { viewBox: moveTo },
    ease: "power3.inOut",
  });
  // worldMap.setAttribute("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
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
  gsap.to(worldMap, {
    duration: 0.8,
    attr: { viewBox: "0 0 1902 762" },
    ease: "power3.inOut",
  });
  filter.dispatchEvent(new Event("keyup"));
});
