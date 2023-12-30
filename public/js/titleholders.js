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
  const countryOptionsNew = countryCodes.map((x) => {
    return { label: x.name, value: x.name };
  });
  VirtualSelect.init({
    ele: "#country-new-holder",
    options: countryOptionsNew,
    multiple: false,
    showSelectedOptionsFirst: true,
    required: true,
    search: true,
  });
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

  addHolderBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const firstnameContent = document.querySelector("#holder-fname").value;
    const lastnameContent = document.querySelector("#holder-lname").value;
    const fullnameContent = firstnameContent + " " + lastnameContent;
    const countryContent = document.querySelector("#country-new-holder").value;
    const fideidContent = document.querySelector("#fideid-new-holder").value;
    const awarddateContent = document.querySelector("#new-holder-date").value;
    const yearContent = Number(
      document
        .querySelector("#new-holder-date")
        .value.toString()
        .substring(0, 4)
    );
    const titleContent = Array.from(
      document.querySelectorAll(".title-types-div input:checked")
    )
      .map((input) => {
        return input.value;
      })
      .join(",");
    const postData = {
      firstname: firstnameContent,
      lastname: lastnameContent,
      fullname: fullnameContent,
      country: countryContent,
      fideid: fideidContent,
      awarddate: awarddateContent,
      year: yearContent,
      title: titleContent,
    };

    fetch(`/pot/titleholders/addmember`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        if (lsiSelect === "LSI") {
          window.location.replace("/pot/titleholders/lsi");
        } else if (siSelect === "SI") {
          window.location.replace("/pot/titleholders/si");
        } else if (sliSelect === "SLI") {
          window.location.replace("/pot/titleholders/sli");
        }
      })
      .catch(() => {
        if (lsiSelect === "LSI") {
          window.location.replace("/pot/titleholders/lsi");
        } else if (siSelect === "SI") {
          window.location.replace("/pot/titleholders/si");
        } else if (sliSelect === "SLI") {
          window.location.replace("/pot/titleholders/sli");
        }
      });
  });
  deleteHolderBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let id = encodeURIComponent(deleteHolderID);
    const postData = {};
    fetch(`/pot/titleholders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        if (lsiSelect === "LSI") {
          window.location.replace("/pot/titleholders/lsi");
        } else if (siSelect === "SI") {
          window.location.replace("/pot/titleholders/si");
        } else if (sliSelect === "SLI") {
          window.location.replace("/pot/titleholders/sli");
        }
      })
      .catch(() => {
        if (lsiSelect === "LSI") {
          window.location.replace("/pot/titleholders/lsi");
        } else if (siSelect === "SI") {
          window.location.replace("/pot/titleholders/si");
        } else if (sliSelect === "SLI") {
          window.location.replace("/pot/titleholders/sli");
        }
      });
  });
  updateHolderBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const firstnameContent = document.querySelector("#holder-fname").value;
    const lastnameContent = document.querySelector("#holder-lname").value;
    const fullnameContent = firstnameContent + " " + lastnameContent;
    const countryContent = document.querySelector("#country-new-holder").value;
    const fideidContent = document.querySelector("#fideid-new-holder").value;
    const awarddateContent = document.querySelector("#new-holder-date").value;
    const yearContent = Number(
      document
        .querySelector("#new-holder-date")
        .value.toString()
        .substring(0, 4)
    );
    const titleContent = Array.from(
      document.querySelectorAll(".title-types-div input:checked")
    )
      .map((input) => {
        return input.value;
      })
      .join(",");
    const postData = {
      firstname: firstnameContent,
      lastname: lastnameContent,
      fullname: fullnameContent,
      country: countryContent,
      fideid: fideidContent,
      awarddate: awarddateContent,
      year: yearContent,
      title: titleContent,
    };
    let id = editHolderID;
    fetch(`/pot/titleholders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        if (lsiSelect === "LSI") {
          window.location.replace("/pot/titleholders/lsi");
        } else if (siSelect === "SI") {
          window.location.replace("/pot/titleholders/si");
        } else if (sliSelect === "SLI") {
          window.location.replace("/pot/titleholders/sli");
        }
      })
      .catch(() => {
        if (lsiSelect === "LSI") {
          window.location.replace("/pot/titleholders/lsi");
        } else if (siSelect === "SI") {
          window.location.replace("/pot/titleholders/si");
        } else if (sliSelect === "SLI") {
          window.location.replace("/pot/titleholders/sli");
        }
      });
  });
}
let deleteHolderID = 0;
let editHolderID = 0;

loadTitleHoldersSelect(lsiSelect);
loadTitleHoldersSelect(siSelect);
loadTitleHoldersSelect(sliSelect);

function loadTitleHoldersSelect(slc) {
  if (slc) {
    allTitleHolders = allTitleHolders.filter((tl) => {
      if (tl.title && typeof tl.title === "string") {
        const tlTitles = tl.title.split(",");
        if (tlTitles.includes(slc)) {
          return tl;
        }
      }
    });
    for (const tl of allTitleHolders) {
      const option = document.createElement("div");
      option.classList.add("titleholder-option");
      option.value = tl.fullname;
      option.innerText = tl.fullname;
      option.addEventListener("click", (evt) => {
        const active = document.querySelector(".option-active");
        if (active) {
          active.classList.remove("option-active");
        }
        evt.target.classList.add("option-active");

        return mutasdAzAdatokat(evt, false);
      });
      document.querySelector(".titleholders-select div").appendChild(option);
    }
  }
}

const titleHolderUL = document.querySelectorAll(
  ".chosen-titleholder ul li span"
);

function mutasdAzAdatokat(evt, torol) {
  if (torol) {
    if (document.querySelector(".admin-user-logged")) {
      if (cancelHolderBtn) {
        editHolderBtn.disabled = true;
        deleteHolderBtn.disabled = true;
        editHolderBtn.removeEventListener("click", () => editHolder(tl));
      }
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
        deleteHolderID = tl._id;
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
    holderInputs[3].value = tl.awarddate;
    document.querySelector("#country-new-holder").setValue(tl.country);
    const tlTitles = tl.title.split(",");
    editHolderID = tl._id;
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

const nameFilter = document.querySelector(
  ".titleholders-filters ul li:last-of-type input"
);
document.querySelector(".clear-th-name").addEventListener("click", (evt) => {
  if (nameFilter.value != "") {
    nameFilter.value = "";
    var keyupEvent = new KeyboardEvent("keyup", {
      key: "Enter",
      bubbles: true,
      cancelable: true,
    });
    nameFilter.dispatchEvent(keyupEvent);
  }
});

yearFilter.addEventListener("change", (evt) => filterOptions(evt));
countryFilter.addEventListener("change", (evt) => filterOptions(evt));
nameFilter.addEventListener("keyup", (evt) => filterOptions(evt));

function filterOptions(evt) {
  const selectedCountry = countryFilter.value;
  const selectedYear = yearFilter.value;
  const nameFraction = nameFilter.value;

  mutasdAzAdatokat(evt, true);
  document
    .querySelectorAll(".titleholder-option")
    .forEach((option) => option.remove());

  allTitleHolders.forEach((holder) => {
    const countryMatch = !selectedCountry || holder.country == selectedCountry;
    const yearMatch = !selectedYear || holder.year == selectedYear;
    const nameMatch = !nameFraction || holder.fullname.includes(nameFraction);
    if (countryMatch && yearMatch && nameMatch) {
      const option = document.createElement("div");
      option.classList.add("titleholder-option");
      option.value = holder.fullname;
      option.innerText = holder.fullname;
      option.addEventListener("click", (evt) => {
        const active = document.querySelector(".option-active");
        if (active) {
          active.classList.remove("option-active");
        }
        evt.target.classList.add("option-active");

        return mutasdAzAdatokat(evt, false);
      });
      document.querySelector(".titleholders-select div").appendChild(option);
    }
  });
}
