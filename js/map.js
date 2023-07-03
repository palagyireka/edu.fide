const element = document.querySelector("#map");
const instance = panzoom(element, {
  bounds: true,
  boundsPadding: 0.3,
  maxZoom: 4,
  minZoom: 1,
});

// MAP

instance.zoomTo(450, 70, 1.7);

const paths = document.querySelectorAll("#map path");

paths.forEach((item) => {
  item.addEventListener("click", (event) => {
    const selectedCountry = document.querySelector(".selected");

    const searchedCountry = document.querySelector(".selected-country");
    if (searchedCountry) {
      searchedCountry.classList.remove("selected-country");
    }

    if (selectedCountry) {
      selectedCountry.classList.remove("selected");
    }
    event.target.classList.add("selected");

    const countryCode = event.target.classList[1].slice(-2);
    let country = "";

    for (let i = 0; i < countryCodes.length; i++) {
      if (countryCodes[i]["alpha-2"] === countryCode) {
        country = countryCodes[i].name;
        break;
      }
    }

    // const pathBBox = event.target.getBBox();
    // console.log(pathBBox.width, pathBBox.height);

    const text = document.getElementById("country-name");
    text.classList.add("hidden");
    setTimeout(() => {
      text.innerText = country;
    }, 200);
    setTimeout(() => {
      text.classList.remove("hidden");
    }, 200);
  });
});

// COUNTRY SEARCH
const list = document.querySelector(".search-countries");

for (let country of countryCodes) {
  const listItem = document.createElement("li");
  listItem.innerText = country.name;

  listItem.addEventListener("click", () => {
    const item = document.querySelector(`.sm_state_${country["alpha-2"]}`);
    item.dispatchEvent(new Event("click"));
  });
  list.appendChild(listItem);
}
const listItems = document.querySelectorAll(".search-countries li");

listItems.forEach((item) => {
  item.addEventListener("click", (event) => {
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

const filter = document.querySelector(".searchbar input");

filter.addEventListener("keyup", (event) => {
  const filterValue = event.target.value.toUpperCase();
  console.log(filterValue);

  for (let item of listItems) {
    text = item.innerText.toUpperCase();
    if (text.indexOf(filterValue) > -1) {
      item.removeAttribute("hidden");
    } else {
      item.setAttribute("hidden", "");
    }
  }
});
