function formatDateForInput(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formattedDate;
}

let allTitleHolders = JSON.parse(
  document.querySelector("div.titleholders-select").getAttribute("data-t")
);

const lsiSelect = document.querySelector("#lsititleholders") ? "LSI" : false;
const siSelect = document.querySelector("#sititleholders") ? "SI" : false;
const sliSelect = document.querySelector("#slititleholders") ? "SLI" : false;

const holderInputs = document.querySelectorAll(
  ".titleholders-flex ~ .add-material > input"
);
const deleteHolderBtn = document.querySelector("#delete-holder");
const editHolderBtn = document.querySelector("#edit-holder");
const addHolderBtn = document.querySelector("#add-holder");
const updateHolderBtn = document.querySelector("#update-holder");
const cancelHolderBtn = document.querySelector("#cancel-holder");
if (cancelHolderBtn) {
  cancelHolderBtn.addEventListener("click", (evt) => {
    holderInputs.forEach((input) => (input.value = ""));
    addHolderBtn.disabled = false;
    updateHolderBtn.disabled = true;
    cancelHolderBtn.disabled = true;
    document
      .querySelectorAll(
        ".titleholders-flex ~ .add-material .title-types-div input"
      )
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
  });
}

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
    if (document.querySelector(".admin-user-logged")) {
      editHolderBtn.disabled = true;
      deleteHolderBtn.disabled = true;
      editHolderBtn.removeEventListener("click", editHolder(tl));
    }
    for (let i = 0; i < 5; i++) {
      titleHolderUL[i].innerText = "";
    }
  } else {
    for (const tl of allTitleHolders) {
      if (evt.target.value == tl.fullname) {
        if (document.querySelector(".admin-user-logged")) {
          deleteHolderBtn.disabled = false;
          holderInputs.forEach((input) => (input.value = ""));
          document
            .querySelectorAll(
              ".titleholders-flex ~ .add-material .title-types-div input"
            )
            .forEach((checkbox) => {
              checkbox.checked = false;
            });
          editHolderBtn.disabled = false;
          editHolderBtn.addEventListener("click", () => editHolder(tl));
        }
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

function editHolder(tl) {
  if (document.querySelector(".admin-user-logged")) {
    document
      .querySelector("form.add-material")
      .scrollIntoView({ behavior: "smooth" });
    addHolderBtn.disabled = true;
    cancelHolderBtn.disabled = false;
    updateHolderBtn.disabled = false;
    holderInputs[0].value = tl.firstname;
    holderInputs[1].value = tl.lastname;
    holderInputs[2].value = tl.fideid;
    holderInputs[3].value = formatDateForInput(tl.awarddate);
    const tlTitles = tl.title.split(",");
    document
      .querySelectorAll(
        ".titleholders-flex ~ .add-material .title-types-div input"
      )
      .forEach((checkbox) => {
        if (tlTitles.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
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
