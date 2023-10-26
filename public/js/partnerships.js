const modOrderSelect = document.querySelector("#modify-partner-order");
if (modOrderSelect) {
  const addBtn = document.querySelector("#add-partner");
  const updateBtn = document.querySelector("button#update-partner");
  const deleteBtn = document.querySelector("button#delete-partner");
  const cancelBtn = document.querySelector("button#cancel-partner");
  const memberInputs = document.querySelectorAll(
    `.add-material:first-of-type input`
  );
  let latestEditedMemberOrder = -1;
  let latestEditedMemberID = 0;
  const addForm = document.querySelector(`.add-material:first-of-type`);
  cancelBtn.addEventListener("click", (evt) => {
    memberInputs.forEach((input) => (input.value = ""));
    addForm.querySelector("textarea").value = "";
    addBtn.disabled = false;
    updateBtn.disabled = true;
    deleteBtn.disabled = true;
  });
  document.querySelectorAll(".memberdiv").forEach((member) => {
    member.addEventListener("dblclick", (evt) => {
      addForm.scrollIntoView({ behavior: "smooth" });
      addBtn.disabled = true;
      updateBtn.disabled = false;
      deleteBtn.disabled = false;
      const memberDatas = member.children;
      latestEditedMemberOrder = memberDatas[0].getAttribute("data-o");
      latestEditedMemberID = memberDatas[2].getAttribute("data-id");
      memberInputs[0].value = memberDatas[0].innerText;
      memberInputs[1].value = memberDatas[1].href;
      addForm.querySelector("textarea").value = memberDatas[2].innerText;
    });
  });

  document
    .querySelector("#move-up-partner")
    .addEventListener("click", (evt) => {
      const movingMember = document.querySelector(
        `#modify-partner-order option:checked`
      );
      const aboveMember = movingMember.previousElementSibling.cloneNode(true);
      movingMember.previousElementSibling.remove();
      modOrderSelect.insertBefore(aboveMember, movingMember.nextElementSibling);
    });
  document
    .querySelector("#move-down-partner")
    .addEventListener("click", (evt) => {
      const movingMember = document.querySelector(
        `#modify-partner-order option:checked`
      );
      const alsoMember = movingMember.nextElementSibling.cloneNode(true);
      movingMember.nextElementSibling.remove();
      if (movingMember.previousElementSibling) {
        modOrderSelect.insertBefore(
          alsoMember,
          movingMember.previousElementSibling
        );
      } else {
        modOrderSelect.insertBefore(alsoMember, movingMember);
      }
    });

  addBtn.addEventListener("click", async (evt) => {
    evt.preventDefault(); // Prevent the default form submission
    const titleContent = document.getElementById("new-partner-title").value;
    const websiteContent = document.getElementById("new-partner-website").value;
    const textContent = document.getElementById("new-partner-desc").value;
    const orderContent = document.querySelectorAll(
      "#modify-partner-order option"
    ).length;
    const postData = {
      title: titleContent,
      text: textContent,
      website: websiteContent,
      order: orderContent,
    };

    fetch(`/partnerships/addmember`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        window.location.replace("/partnerships");
      })
      .catch(() => {
        window.location.replace("/partnerships");
      });
    window.location.replace("/partnerships");
  });

  updateBtn.addEventListener("click", async (evt) => {
    evt.preventDefault(); // Prevent the default form submission
    const titleContent = document.getElementById("new-partner-title").value;
    const websiteContent = document.getElementById("new-partner-website").value;
    const textContent = document.getElementById("new-partner-desc").value;
    const orderContent = Number(latestEditedMemberOrder);
    let id = encodeURIComponent(latestEditedMemberID);
    const postData = {
      title: titleContent,
      text: textContent,
      website: websiteContent,
      order: orderContent,
    };
    fetch(`/partnerships/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        window.location.replace("/partnerships");
      })
      .catch(() => {
        window.location.replace("/partnerships");
      });
    window.location.replace("/partnerships");
  });

  deleteBtn.addEventListener("click", async (evt) => {
    evt.preventDefault(); // Prevent the default form submission
    let id = encodeURIComponent(latestEditedMemberID);
    const postData = {};
    fetch(`/partnerships/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        window.location.replace("/partnerships");
      })
      .catch(() => {
        window.location.replace("/partnerships");
      });
    window.location.replace("/partnerships");
  });
}
