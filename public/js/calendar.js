const calendar = document.getElementById("featured");
const calendarKeeper = document.getElementById("search-and-featured");
const search = document.querySelector(".search-container");

calendar.addEventListener("mouseover", (evt) => {
  search.style.display = "none";
  calendar.style.height = "60vh";
  calendarKeeper.style.width = "400px";
  calendar.style.width = "400px";
});
calendar.addEventListener("mouseout", (evt) => {
  search.style.display = "block";
  calendar.style.height = "40vh";
  calendar.style.width = "200px";
  calendarKeeper.style.width = "200px";
});
