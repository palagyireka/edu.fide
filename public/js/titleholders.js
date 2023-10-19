let allTitleHolders = JSON.parse(
  document.querySelector("div.titleholders-select").getAttribute("data-t")
);

const lsiSelect = document.querySelector("#lsititleholders") ? "LSI" : false;
const siSelect = document.querySelector("#sititleholders") ? "SI" : false;
const sliSelect = document.querySelector("#slititleholders") ? "SLI" : false;

loadTitleHoldersSelect(lsiSelect);
loadTitleHoldersSelect(siSelect);
loadTitleHoldersSelect(sliSelect);

function loadTitleHoldersSelect(slc) {
  if (slc) {
    allTitleHolders = allTitleHolders.filter((tl) => {
      const tlTitles = tl.title.split(",");
      if (tlTitles.includes(slc)) {
        return tl;
      }
    });
    for (const tl of allTitleHolders) {
      const option = document.createElement("option");
      option.value = tl.fullname;
      option.innerText = tl.fullname;
      option.addEventListener("click", (evt) => mutasdAzAdatokat(evt, false));
      option.addEventListener("touchstart", (evt) =>
        mutasdAzAdatokat(evt, false)
      );
      document.querySelector(".titleholders-select select").appendChild(option);
    }
  }
}

const titleHolderUL = document.querySelectorAll(
  ".chosen-titleholder ul li span"
);

function mutasdAzAdatokat(evt, torol) {
  if (torol) {
    titleHolderUL[0].innerText = "";
    titleHolderUL[1].innerText = "";
    titleHolderUL[2].innerText = "";
    titleHolderUL[3].innerText = "";
    titleHolderUL[4].innerText = "";
  } else {
    for (const tl of allTitleHolders) {
      if (evt.target.value == tl.fullname) {
        titleHolderUL[0].innerText = tl.firstname;
        titleHolderUL[1].innerText = tl.lastname;
        titleHolderUL[2].innerText = tl.country;
        titleHolderUL[3].innerText = tl.fideid;
        titleHolderUL[4].innerText = tl.year;
        break;
      }
    }
  }
}

const yearFilter = document.querySelector(`#year-filter`);
let thisYear = new Date().getFullYear();
let yearOptions = [];
for (let i = 2015; i <= thisYear; i++) {
  yearOptions.push(i);
}
VirtualSelect.init({
  ele: "#year-filter",
  options: yearOptions,
  multiple: false,
  showSelectedOptionsFirst: true,
  required: true,
  search: true,
});

let URLparam = new URLSearchParams(document.location.search);
const initialCountry = URLparam.get("country");
const countryFilter = document.querySelector(`#country-filter`);
const countryOptions = countryCodes.map((x) => {
  return { label: x.name, value: x.name };
});
VirtualSelect.init({
  ele: "#country-filter",
  options: countryOptions,
  multiple: false,
  showSelectedOptionsFirst: true,
  required: true,
  search: true,
  selectedValue: initialCountry,
});

yearFilter.addEventListener("change", (evt) => filterOptions(evt));
countryFilter.addEventListener("change", (evt) => filterOptions(evt));

function filterOptions(evt) {
  const selectedCountry = countryFilter.value;
  const selectedYear = yearFilter.value;
  mutasdAzAdatokat(evt, true);
  const allOptions = document.querySelectorAll(".titleholders-select option");
  allOptions.forEach((option) => option.remove());

  allTitleHolders.forEach((holder) => {
    const countryMatch = !selectedCountry || holder.country == selectedCountry;
    const yearMatch = !selectedYear || holder.year == selectedYear;
    if (countryMatch && yearMatch) {
      const option = document.createElement("option");
      option.value = holder.fullname;
      option.innerText = holder.fullname;
      option.addEventListener("click", (evt) => mutasdAzAdatokat(evt, false));
      option.addEventListener("touchstart", (evt) =>
        mutasdAzAdatokat(evt, false)
      );
      document.querySelector(".titleholders-select select").appendChild(option);
    }
  });
}
