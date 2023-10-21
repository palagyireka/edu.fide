const tagOptions = [
  "Commission News",
  "Conferences",
  "CIE Initiatives",
  "Research News",
  "Course News",
  "CIE News",
  "Blog",
];
const searchTagFilter = document.querySelector("#tag-filter");
VirtualSelect.init({
  ele: "#tag-filter",
  options: tagOptions,
  multiple: false,
  showSelectedOptionsFirst: true,
  required: true,
  search: true,
  selectedValue: "All Posts",
});
const countryOptions = countryCodes.map((x) => {
  return { label: x.name, value: x.name };
});
const searchCountryFilter = document.querySelector("#country-filter");
VirtualSelect.init({
  ele: "#country-filter",
  options: countryOptions,
  multiple: false,
  showSelectedOptionsFirst: true,
  required: true,
  search: true,
  selectedValue: "All Countries",
});

const yearsInTag = document.querySelectorAll(".year-tag");
const yearOptions = [];
for (let i = 0; i < yearsInTag.length; i++) {
  if (
    i === yearsInTag.length - 1 ||
    yearsInTag[i].innerText !== yearsInTag[i + 1].innerText
  ) {
    yearOptions.push(yearsInTag[i].innerText);
  }
}
const searchYearFilter = document.querySelector("#year-filter");
VirtualSelect.init({
  ele: "#year-filter",
  options: yearOptions,
  multiple: false,
  showSelectedOptionsFirst: true,
  required: true,
  search: true,
  selectedValue: "Any Year",
});

const resultCardTags = document.querySelectorAll(".tag-names");
const allResultCardTags = [];
resultCardTags.forEach((cardtag) => {
  const tags = cardtag.innerText
    .split(",")
    .map((tag) => {
      let formattedTag = tag.trim();
      formattedTag = formattedTag.split(/(?=[A-Z])/).join(" ");
      if (formattedTag.slice(0, 3) === "cie") {
        formattedTag =
          formattedTag.slice(0, 3).toUpperCase() + formattedTag.slice(3);
      } else {
        formattedTag = formattedTag[0].toUpperCase() + formattedTag.slice(1);
      }
      return formattedTag;
    })
    .join(", ");
  cardtag.innerText = tags;
  allResultCardTags.push(
    cardtag.innerText.split(",").map((tag) => {
      let formattedTag = tag.trim();
      if (formattedTag.slice(0, 3).toLowerCase() === "cie") {
        formattedTag = "CIE" + formattedTag.slice(3);
      } else {
        formattedTag = formattedTag.replace(/([a-z])([A-Z])/g, "$1 $2");
        formattedTag = formattedTag[0].toUpperCase() + formattedTag.slice(1);
      }
      return formattedTag;
    })
  );
});
const resultCards = document.querySelectorAll(".result-card");
const shallowResultCards = Array.from(resultCards);
allResultCards = shallowResultCards.map((element) => element.cloneNode(true));

const searchResults = document.querySelector(".search-results");

const yearTags = document.querySelectorAll(".year-tag");
const allResultCardsData = [];
for (let i = 0; i < allResultCards.length; i++) {
  const cardData = {
    card: allResultCards[i],
    tags: allResultCardTags[i],
    year: yearTags[i].innerText,
  };
  allResultCardsData.push(cardData);
}
const firstSix = document.createElement("div");
firstSix.classList.add("first-six");
for (let i = 5; i >= 0; i--) {
  firstSix.appendChild(resultCards[i]);
}
searchResults.insertBefore(
  firstSix,
  searchResults.firstElementChild.nextElementSibling
);
const searchFilters = [searchTagFilter, searchCountryFilter, searchYearFilter];
searchFilters.forEach((filter) => {
  filter.addEventListener("change", (evt) => {
    const chosenTags =
      searchTagFilter.value === "" ? null : searchTagFilter.value;
    const chosenCountry =
      searchCountryFilter.value === "" ? null : searchCountryFilter.value;
    const chosenYear =
      searchYearFilter.value === "" ? null : searchYearFilter.value;
    document.querySelectorAll(".result-card").forEach((card) => card.remove());
    let i = 0;
    allResultCardsData.forEach((data) => {
      const countryMatch =
        chosenCountry === null || data.tags.includes(chosenCountry);
      const yearMatch = chosenYear === null || data.year == chosenYear;
      const tagMatch = chosenTags === null || data.tags.includes(chosenTags);
      if (countryMatch && yearMatch && tagMatch) {
        if (i < 6) {
          firstSix.appendChild(data.card);
        } else if (i == 6) {
          searchResults.insertBefore(
            firstSix,
            searchResults.firstElementChild.nextElementSibling
          );
          searchResults.appendChild(data.card);
        } else {
          searchResults.appendChild(data.card);
        }
        i++;
      }
    });
  });
});
