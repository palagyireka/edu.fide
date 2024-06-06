const schs = document.querySelectorAll(".sch");

schs.forEach((sch) => {
  const setRotation = () => {
    sch.style.setProperty("--rotation", `${-15 + Math.random() * 30}deg`);
  };

  const toggleRotation = (add) =>
    sch.classList[add ? "add" : "remove"]("rotate");

  sch.addEventListener("mouseover", () => toggleRotation(false));
  sch.addEventListener("mouseleave", () => {
    setRotation();
    toggleRotation(true);
  });

  setRotation();
  toggleRotation(true);
});

const dropd = document.querySelector(".sch-dropdown");
if (dropd) {
  const inputs = document.querySelectorAll("#add-win input");
  const addbtn = document.querySelector("button#addsch");
  const delbtn = document.querySelector("#deletesch");
  const updatebtn = document.querySelector("#updatesch");
  const cancelbtn = document.querySelector("#cancelsch");
  let latestid = "";
  dropd.addEventListener("change", () => {
    const selectedSch = JSON.parse(dropd.value);
    inputs[0].value = selectedSch.name;
    inputs[1].value = selectedSch.country;
    inputs[2].value = selectedSch.city;
    inputs[3].value = selectedSch.awardlevel;
    inputs[4].value = selectedSch.awarddate;
    latestid = selectedSch._id;
    cancelbtn.disabled = false;
    delbtn.disabled = false;
    updatebtn.disabled = false;
    addbtn.disabled = true;
  });
  cancelbtn.addEventListener("click", () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  });
  addbtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const nameContent = inputs[0].value;
    const countryContent = inputs[1].value;
    const cityContent = inputs[2].value;
    const levelContent = inputs[3].value;
    const dateContent = inputs[4].value;

    const postData = {
      name: nameContent,
      country: countryContent,
      city: cityContent,
      awardlevel: levelContent,
      awarddate: dateContent,
    };
    fetch(`/certification/fide-schools/add-winner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        window.location.replace("/certification/fide-schools");
      })
      .catch(() => {
        window.location.replace("/certification/fide-schools");
      });
  });
  updatebtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const nameContent = inputs[0].value;
    const countryContent = inputs[1].value;
    const cityContent = inputs[2].value;
    const levelContent = inputs[3].value;
    const dateContent = inputs[4].value;

    const postData = {
      name: nameContent,
      country: countryContent,
      city: cityContent,
      awardlevel: levelContent,
      awarddate: dateContent,
    };

    fetch(`/certification/fide-schools/update/${latestid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        window.location.replace("/certification/fide-schools");
      })
      .catch(() => {
        window.location.replace("/certification/fide-schools");
      });
  });

  delbtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let id = encodeURIComponent(latestid);
    const postData = {};
    fetch(`/certification/fide-schools/update/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        window.location.replace("/certification/fide-schools");
      })
      .catch(() => {
        window.location.replace("/certification/fide-schools");
      });
  });
}
