const addMemberForm = document.querySelector(".add-material");
if (addMemberForm) {
  const addMemberBtn = document.querySelector("button#add-member");
  const updateMemberBtn = document.querySelector("button#update-member");
  const deleteMemberBtn = document.querySelector("button#delete-member");
  const cancelMemberBtn = document.querySelector("button#cancel-member");
  const memberInputs = document.querySelectorAll(`.add-material input`);
  const updateOrderBtn = document.querySelector("#save-order-co");
  let latestEditedMemberSeq = -1;
  let latestEditedMemberID = -1;
  cancelMemberBtn.addEventListener("click", (evt) => {
    memberInputs.forEach((input) => (input.value = ""));
    addMemberForm.querySelector("textarea").value = "";
    addMemberBtn.disabled = false;
    updateMemberBtn.disabled = true;
    deleteMemberBtn.disabled = true;
  });
  document.querySelectorAll(".memberdiv").forEach((member) => {
    member.addEventListener("dblclick", (evt) => {
      addMemberForm.scrollIntoView({ behavior: "smooth" });
      addMemberBtn.disabled = true;
      updateMemberBtn.disabled = false;
      deleteMemberBtn.disabled = false;
      const memberDatas = member.children;
      latestEditedMemberSeq = memberDatas[2].getAttribute("data-seq");
      latestEditedMemberID = memberDatas[2].getAttribute("data-id");
      const names = memberDatas[1].innerText
        .split(",")
        .map((element) => element.trim());
      console.log(memberInputs);
      memberInputs[0].value = names[1];
      memberInputs[1].value = names[0];
      memberInputs[2].value = memberDatas[1].href;
      memberInputs[4].value = memberDatas[3].innerText;
      memberInputs[5].value = memberDatas[4].innerText;
      addMemberForm.querySelector("textarea").value = memberDatas[5].innerText;
      const options = Array.from(
        addMemberForm.querySelectorAll("select option")
      ).map((option) => option.value);
      addMemberForm.querySelector("select").value = memberDatas[2].innerText;
    });
  });
  const modOrderSelect = document.querySelector("#modify-member-order");

  document.querySelector("#move-up-member").addEventListener("click", (evt) => {
    const movingMember = document.querySelector(
      `#modify-member-order option:checked`
    );
    const aboveMember = movingMember.previousElementSibling.cloneNode(true);
    movingMember.previousElementSibling.remove();
    modOrderSelect.insertBefore(aboveMember, movingMember.nextElementSibling);
  });
  document
    .querySelector("#move-down-member")
    .addEventListener("click", (evt) => {
      const movingMember = document.querySelector(
        `#modify-member-order option:checked`
      );
      const alsoMember = movingMember.nextElementSibling.cloneNode(true);
      movingMember.nextElementSibling.remove();
      modOrderSelect.insertBefore(alsoMember, movingMember);
    });

  addMemberBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const nameContent =
      document.getElementById("comember-lname").value +
      ", " +
      document.getElementById("comember-fname").value;
    const nameLinkContent = document.getElementById("member-rating-new").value;
    const emailContent = document.getElementById("new-member-email").value;
    const phoneContent = document.getElementById("new-member-phone").value;
    const titleContent = document.getElementById("new-member-rank").value;
    const introContent = document.getElementById("new-member-desc").value;
    const seqContent = document.querySelectorAll(".memberdiv").length;
    const postData = {
      name: nameContent,
      namelink: nameLinkContent,
      // imgHref: imghref,
      email: emailContent,
      phone: phoneContent,
      title: titleContent,
      introduction: introContent,
      seq: seqContent,
    };

    fetch(`/commission/addmember`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        window.location.replace("/commission");
      })
      .catch(() => {
        window.location.replace("/commission");
      });
    window.location.replace("/commission");
  });

  updateMemberBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const nameContent =
      document.getElementById("comember-lname").value +
      ", " +
      document.getElementById("comember-fname").value;
    const nameLinkContent = document.getElementById("member-rating-new").value;
    const emailContent = document.getElementById("new-member-email").value;
    const phoneContent = document.getElementById("new-member-phone").value;
    const titleContent = document.getElementById("new-member-rank").value;
    const introContent = document.getElementById("new-member-desc").value;
    const seqContent = Number(latestEditedMemberSeq);
    let id = encodeURIComponent(latestEditedMemberID);
    const postData = {
      name: nameContent,
      namelink: nameLinkContent,
      // imgHref: imghref,
      email: emailContent,
      phone: phoneContent,
      title: titleContent,
      introduction: introContent,
      seq: seqContent,
    };
    fetch(`/commission/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        window.location.replace("/commission");
      })
      .catch(() => {
        window.location.replace("/commission");
      });
    window.location.replace("/commission");
  });

  deleteMemberBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let id = encodeURIComponent(latestEditedMemberID);
    const postData = {};
    fetch(`/commission/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        window.location.replace("/commission");
      })
      .catch(() => {
        window.location.replace("/commission");
      });
    window.location.replace("/commission");
  });

  updateOrderBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const orderOptions = document.querySelectorAll(
      "#modify-member-order option"
    );
    let idsContent = [];
    let ordersContent = [];
    for (let i = 0; i < orderOptions.length; i++) {
      const originalseq = Number(orderOptions[i].getAttribute("data-ors"));
      if (originalseq !== i + 1) {
        idsContent.push(orderOptions[i].value);
        ordersContent.push(i + 1);
      }
    }
    const postData = {
      ids: idsContent,
      orders: ordersContent,
    };
    fetch(`/commission/updateorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        window.location.replace("/commission");
      })
      .catch(() => {
        window.location.replace("/commission");
      });
    window.location.replace("/commission");
  });
}
