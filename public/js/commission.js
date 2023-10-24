const addMemberForm = document.querySelector(".add-material");
if (addMemberForm) {
  const addMemberBtn = document.querySelector("button#add-member");
  const updateMemberBtn = document.querySelector("button#update-member");
  const deleteMemberBtn = document.querySelector("button#delete-member");
  const cancelMemberBtn = document.querySelector("button#cancel-member");
  const memberInputs = document.querySelectorAll(`.add-material input`);

  console.log(memberInputs);

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
}
