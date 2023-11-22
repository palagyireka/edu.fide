const makeRows = () => {
  const blogCards = document.querySelectorAll("#b-posts > .blog-card");
  let counter = 0;

  while (counter < blogCards.length) {
    const sor = document.createElement("div");
    sor.className = "blogsor";
    sor.appendChild(blogCards[counter]);
    if (counter + 1 != blogCards.length) {
      sor.appendChild(blogCards[counter + 1]);
    }
    if (counter + 2 != blogCards.length) {
      sor.appendChild(blogCards[counter + 2]);
    }
    bPosts.appendChild(sor);
    counter += 3;
  }
};

makeRows();

const loadMoreButton = document.getElementById("load-more");
let startFrom = 1;

const renderNewPosts = (posts) => {
  posts.forEach((post) => {
    const img = document.createElement("img");
    const a = document.createElement("a");
    const title = document.createElement("h2");
    const p = document.createElement("p");
    const span = document.createElement("span");
    const readMoreSpan = document.createElement("span");

    let pathname = window.location.pathname;

    if (window.location.pathname === "/admin/posts") {
      pathname = "/admin";
    }

    a.href = `${pathname}/${post._id}`;
    a.classList.add("blog-card");
    title.innerText = post.title;
    if (post.images[0].url !== "") {
      img.src = post.images[0].url;
    }
    span.innerText = post.text;
    p.appendChild(img);
    p.appendChild(span);
    readMoreSpan.innerText = " Read more here >> ";
    a.appendChild(title);
    a.appendChild(p);
    a.appendChild(readMoreSpan);
    bPosts.appendChild(a);
  });

  makeRows();
};

const clickHandler = async () => {
  const body = { page: startFrom + 1 };

  let pathname = window.location.pathname;

  if (window.location.pathname === "/admin/posts") {
    pathname = "/admin/posts/json";
  }

  fetch(pathname, {
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
      renderNewPosts(postData.posts);
      if (postData.lastPage === true) {
        loadMoreButton.style.visibility = "hidden";
      }
    });

  startFrom += 1;
};

if (loadMoreButton) {
  loadMoreButton.addEventListener("click", clickHandler);
}
