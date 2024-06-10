const featuredPosts = JSON.parse(
  document.querySelector(".featured-title").getAttribute("data-f")
);
const a = document.querySelector("p + a");
const title = document.querySelector(".featured-title");
const img = document.querySelector(".featured-img-container img");
const text = document.querySelector(".featured-text");
let i = 0;
const updateFeatured = () => {
  const p = featuredPosts[i];
  let tag;
  if (p.tags[0] === "all") {
    tag = "blog";
  } else if (p.tags[0] === "cieInitiatives") {
    tag = "initiatives";
  } else {
    tag = p.tags[0];
  }
  a.href = `/${tag}/${p._id}`;
  title.textContent = p.title;
  img.src = p.images[0].url;
  text.textContent = p.text;

  i = (i + 1) % featuredPosts.length;
};

updateFeatured();
startInterval = () => {
  intervalId = setInterval(updateFeatured, 3000);
};
startInterval();

a.addEventListener("mouseenter", () => {
  clearInterval(intervalId);
});
a.addEventListener("mouseleave", startInterval);
