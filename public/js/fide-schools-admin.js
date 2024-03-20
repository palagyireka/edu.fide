const plussigns = document.querySelectorAll(".plussign");
const minussigns = document.querySelectorAll(".minussign");
const deleteApplicantButtons = document.querySelectorAll(".delete-applicant");
const longAnswers = document.querySelectorAll(".long-answers");
const downloadButton = document.getElementById("csv-download");
const deleteDialog = document.getElementById("delete-dialog");
const deleteConfirmButton = document.getElementById("delete-confirm");
const deleteConfirmMessage = document.getElementById("delete-message");

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
deleteApplicantButtons.forEach((button) => {
  button.addEventListener("click", () => {
    deleteDialog.showModal();
    deleteConfirmButton.value = button.dataset.id;
    deleteConfirmMessage.innerText = `Delete ${button.dataset.name}'s application?`;
  });
});

const deleteApplicant = async () => {
  const id = deleteConfirmButton.value;
  fetch(`/admin/fide-schools/${id}`, {
    method: "DELETE",
    redirect: "follow",
  });
};

const downloadCsv = () => {
  fetch(`fide-schools/download`, {
    method: "GET",
  })
    .then((res) => {
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

deleteConfirmButton.addEventListener("click", deleteApplicant);
downloadButton.addEventListener("click", downloadCsv);
