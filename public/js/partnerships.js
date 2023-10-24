const modOrderSelect = document.querySelector("#modify-partner-order");
if (modOrderSelect) {
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
}
