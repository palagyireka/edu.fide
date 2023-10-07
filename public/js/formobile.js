const calendarList = document
  .querySelector("#calendar-container")
  .cloneNode(true);
const footer = document.querySelector("footer").cloneNode(true);

if (window.innerWidth <= 1200 || window.screen.width <= 1200) {
  document.querySelector("#calendar-container").remove();
  document.querySelector("footer").remove();
  document.querySelector("main").appendChild(calendarList);
  document.querySelector("main").appendChild(footer);
}
