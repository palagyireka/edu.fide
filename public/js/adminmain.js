const downloadButton = document.getElementById("user-csv-download");
const loadMoreButton = document.getElementById("load-more");
const profileTable = document.querySelector(".profiles-container tbody");

let pageNumber = 1;

const downloadCsv = () => {
  fetch(`/admin/users/csv`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then(async (res) => ({
      filename: "users.xlsx",
      blob: await res.blob(),
    }))
    .then((resObj) => {
      const newBlob = new Blob([resObj.blob], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
      } else {
        const objUrl = window.URL.createObjectURL(newBlob);

        let link = document.createElement("a");
        link.href = objUrl;
        link.download = resObj.filename;
        link.click();

        setTimeout(() => {
          window.URL.revokeObjectURL(objUrl);
        }, 250);
      }
    })
    .catch((error) => {
      console.log("DOWNLOAD ERROR", error);
    });
};

const createUserChart = (users) => {
  users.forEach((user) => {
    const newRow = document.createElement("tr");

    const emailCell = document.createElement("td");
    const emailLink = document.createElement("a");
    emailLink.href = `mailto:${user.email}`;
    emailLink.innerText = user.email;
    emailCell.appendChild(emailLink);

    const nameCell = document.createElement("td");
    nameCell.innerText = `${user.firstName} ${user.lastName}`;

    const workplaceCell = document.createElement("td");
    workplaceCell.innerText = user.workplaceCell;

    const jobCell = document.createElement("td");
    jobCell.innerText = user.jobtitle;

    const respCell = document.createElement("td");
    respCell.innerText = user.respCie;

    const regCell = document.createElement("td");
    regCell.innerText = new Date(user.registrationDate).toDateString();

    const newsletterCell = document.createElement("td");
    newsletterCell.innerText = user.newsletter === true ? "✅" : "❌";

    [
      emailCell,
      nameCell,
      workplaceCell,
      jobCell,
      respCell,
      regCell,
      newsletterCell,
    ].forEach((cell) => newRow.appendChild(cell));
    profileTable.appendChild(newRow);
  });
};

const loadMore = async () => {
  const body = { page: pageNumber + 1 };

  fetch("admin/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "manual",
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((postData) => {
      console.log(postData);
      createUserChart(postData.users);
      if (postData.lastPage === true) {
        loadMoreButton.style.visibility = "hidden";
      }
    });

  pageNumber += 1;
};

downloadButton.addEventListener("click", downloadCsv);
loadMoreButton.addEventListener("click", loadMore);
