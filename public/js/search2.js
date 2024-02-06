const tagOptions = [
  { label: "Commission News", value: "commissionNews" },
  { label: "Conferences", value: "conferences" },
  { label: "CIE Initiatives", value: "cieInitiatives" },
  { label: "Research News", value: "researchNews" },
  { label: "Course News", value: "courseNews" },
  { label: "CIE News", value: "cieNews" },
  { label: "Blog", value: "blog" },
  { label: "Personal Stories", value: "personalStories" },
  { label: "All", value: "all" },
];
const searchTagFilter = document.querySelector("#tag-filter");

VirtualSelect.init({
  ele: "#tag-filter",
  options: tagOptions,
  multiple: false,
  showSelectedOptionsFirst: true,
  required: true,
  search: true,
});

let countryOptions = [];

countryCodes.forEach((country) => {
  if (aggregateData.distinctCountries.includes(country["alpha-2"])) {
    countryOptions.push({ label: country.name, value: country["alpha-2"] });
  }
});

const searchCountryFilter = document.querySelector("#country-filter");
VirtualSelect.init({
  ele: "#country-filter",
  options: countryOptions,
  multiple: false,
  showSelectedOptionsFirst: true,
  required: true,
  search: true,
});

const yearOptions = aggregateData.distinctYears;

const searchYearFilter = document.querySelector("#year-filter");
VirtualSelect.init({
  ele: "#year-filter",
  options: yearOptions,
  multiple: false,
  required: true,
  search: true,
});

let lastDate = new Date("2050-01");
let pageNumber = 1;

const getSearchResults = async (tag, country, year) => {
  const data = {
    tag,
    country,
    year,
    lastDate,
    pageNumber,
  };

  const response = await fetch("/api/search", {
    body: JSON.stringify(data),
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const formatCards = (postData, isFirst = true) => {
  postData.forEach((post, index, array) => {
    if (index === array.length - 1) {
      lastDate = post.date;
    }
    const card = document.createElement("a");
    const tagDiv = document.createElement("div");
    const title = document.createElement("h2");
    const textContainer = document.createElement("div");
    const text = document.createElement("p");
    const yearDiv = document.createElement("div");

    const tagFullName = [];
    post.tags.forEach((tag) => {
      const tagName = tagOptions.filter((option) => {
        return option.value === tag;
      });
      tagFullName.push(tagName[0].label);
    });

    card.classList.add("result-card");
    card.href = `/blog/${post._id}`;
    tagDiv.classList.add("tag-names");
    tagDiv.innerText = tagFullName.join(", ");
    title.innerText = post.title;
    yearDiv.classList.add("year-tag");
    yearDiv.innerText = new Date(post.date).getFullYear();
    textContainer.classList.add("text-container");
    text.innerHTML = post.text;

    card.append(tagDiv, title, textContainer, yearDiv);

    if (post.images && post.images[0].url !== "") {
      const image = document.createElement("img");
      image.src = post.images[0].url;
      textContainer.appendChild(image);
    }

    textContainer.appendChild(text);

    if (isFirst === true && index < 6) {
      document.querySelector(".first-six").appendChild(card);
    } else {
      document.querySelector(".card-container").appendChild(card);
    }
  });
};

const loadCards = (isFirst = true) => {
  getSearchResults(
    searchTagFilter.value,
    searchCountryFilter.value,
    searchYearFilter.value
  ).then((results) => {
    const btn = document.getElementById("load-more");
    if (btn) {
      btn.remove();
    }

    formatCards(results.posts, isFirst);

    if (typeof results.lastPage !== "undefined" && results.lastPage === false) {
      const loadMoreButton = document.createElement("button");
      loadMoreButton.classList.add("fancytime");
      loadMoreButton.id = "load-more";
      loadMoreButton.innerText = "Load More";
      loadMoreButton.addEventListener("click", loadMore);
      document
        .querySelector(".load-more-container")
        .appendChild(loadMoreButton);
    }
  });
};

const newSearch = () => {
  const previousElements = document.querySelectorAll(".result-card");
  previousElements.forEach((element) => {
    element.remove();
  });

  lastDate = new Date("2050-01");
  pageNumber = 1;

  loadCards();
};

const loadMore = () => {
  pageNumber++;

  loadCards(false);
};

searchTagFilter.addEventListener("change", newSearch);
searchCountryFilter.addEventListener("change", newSearch);
searchYearFilter.addEventListener("change", newSearch);

loadCards();
