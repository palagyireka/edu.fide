const downloadButton = document.getElementById("user-csv-download");

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

downloadButton.addEventListener("click", downloadCsv);

const loadMoreButton = document.getElementById("load-more");

let pageNumber = 1;

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
      if (postData.lastPage === true) {
        loadMoreButton.style.visibility = "hidden";
      }
    });

  pageNumber += 1;
};

loadMoreButton.addEventListener("click", loadMore);
