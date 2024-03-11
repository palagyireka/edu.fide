const plussigns = document.querySelectorAll(".plussign");
const minussigns = document.querySelectorAll(".minussign");
const longAnswers = document.querySelectorAll(".long-answers");

const toggleHidden = (index) => {
  const plussign = document.querySelector(`#plussign-${index}`);
  const minussign = document.querySelector(`#minussign-${index}`);
  const longAnswer = document.querySelector(`#answers${index}`);

  plussign.classList.toggle("hidden");
  minussign.classList.toggle("hidden");
  longAnswer.classList.toggle("hidden");
};

plussigns.forEach((sign, index) => {
  sign.addEventListener("click", () => toggleHidden(index));
});
minussigns.forEach((sign, index) => {
  sign.addEventListener("click", () => toggleHidden(index));
});

const downloadButton = document.getElementById("csv-download");

const downloadCsv = () => {
  fetch(`fide-schools/download`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then(async (res) => ({
      filename: "applicants.xlsx",
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
