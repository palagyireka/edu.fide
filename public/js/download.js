const addForm = document.querySelector(".add-material");
const downloadMaterials = JSON.parse(
  document.querySelector(".materials").getAttribute("data-d")
);

const catLabels = document.querySelectorAll(".categories label");
const background = document.querySelector(".background");
let hoverActive = false;

window.addEventListener("scroll", (evt) => {
  if (hoverActive) {
    background.style.display = "none";
  }
});

catLabels.forEach((lbl) => {
  lbl.addEventListener("mouseenter", (evt) => {
    if (window.innerWidth > 1200 && window.screen.width > 1200) {
      hoverActive = true;
      background.style.left = `${lbl.offsetLeft}px`;
      background.style.top = `${lbl.offsetTop - window.scrollY}px`;
      background.style.display = "block";
      background.style.height = window
        .getComputedStyle(lbl)
        .getPropertyValue("height");
      background.style.width = window
        .getComputedStyle(lbl)
        .getPropertyValue("width");
    }
  });
  lbl.addEventListener("mouseleave", (evt) => {
    background.style.width = "0px";
  });
  lbl.addEventListener("click", (evt) => {
    if (document.querySelector(".materials tbody")) {
      document.querySelector(".materials tbody").remove();
    }
    const tbody = document.createElement("tbody");
    for (const dm of downloadMaterials) {
      if (dm.type == lbl.getAttribute("for")) {
        const row = document.createElement("tr");
        const authortd = document.createElement("td");
        if (dm.author) {
          authortd.innerText = dm.author;
        }
        const titletd = document.createElement("td");
        titletd.innerText = dm.title;
        const langtd = document.createElement("td");
        langtd.innerText = dm.lang;
        row.appendChild(authortd);
        row.appendChild(titletd);
        row.appendChild(langtd);
        if (addForm) {
          const deleteBtn = document.createElement("button");
          deleteBtn.classList.add("delete-mat");
          deleteBtn.innerText = "Delete";
          deleteBtn.addEventListener("click", async (evt) => {
            evt.preventDefault();
            let id = dm._id;
            console.log(`The id is: ${id}`);
            const postData = {};
            fetch(`/download/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                window.location.replace("/download");
              })
              .catch(() => {
                window.location.replace("/download");
              });
            window.location.replace("/download");
          });
          row.appendChild(deleteBtn);
        }
        tbody.appendChild(row);
        row.addEventListener("click", (evt) => {
          if (
            row.nextElementSibling &&
            row.nextElementSibling.firstChild &&
            row.nextElementSibling.firstChild.firstChild &&
            row.nextElementSibling.firstChild.firstChild.tagName == "IFRAME"
          ) {
            row.nextElementSibling.remove();
          } else {
            const iframe = Object.assign(document.createElement("iframe"), {
              src: dm.source,
              allowFullscreen: true,
              frameBorder: "0",
            });
            const newRow = document.createElement("tr");
            const newData = document.createElement("td");
            newData.classList.add("iframe-row");
            newData.colSpan = row.cells.length;
            newData.appendChild(iframe);
            newRow.appendChild(newData);
            tbody.insertBefore(newRow, row.nextElementSibling);
          }
        });
      }
    }
    document.querySelector("table.materials").appendChild(tbody);
    document.querySelector("table.materials").style.opacity = "1";
  });
});

if (addForm) {
  const addBtn = document.querySelector("#add-material");
  addBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const authorContent = document.getElementById("mat-author").value;
    const titleContent = document.getElementById("mat-title").value;
    const langContent = document.getElementById("mat-lang").value;
    const srcContent = document.getElementById("mat-src").value;
    const typeContent = document.getElementById("mat-type").value;
    const postData = {
      author: authorContent,
      title: titleContent,
      lang: langContent,
      source: srcContent,
      type: typeContent,
    };

    fetch(`/download/addmaterial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        window.location.replace("/download");
      })
      .catch(() => {
        window.location.replace("/download");
      });
  });
}
