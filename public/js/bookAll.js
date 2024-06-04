const bodyDiv = document.querySelector(".text-body");
const url = window.location.href;

async function getContent() {
  const response = await fetch(`/api/books`, {
    method: "GET",
  });

  const bookData = await response.json();

  bookData.reverse().forEach((book) => {
    const tempQuill = new Quill(document.createElement("div"), {
      modules: {
        imageResize: {},
      },
    });
    tempQuill.setContents(book.text);

    const wrapperDiv = document.createElement("div");
    const titleDiv = document.createElement("div");

    const textDiv = document.createElement("div");
    const deleteButton = document.createElement("button");
    const deleteForm = document.createElement("form");
    const editLink = document.createElement("a");

    deleteForm.method = "post";
    deleteForm.action = `/newbooks/${book._id}?_method=DELETE`;

    wrapperDiv.classList.add("book-wrapper");
    titleDiv.classList.add("book-title");
    textDiv.classList.add("book-text");
    deleteButton.classList.add("book-delete-button");
    editLink.classList.add("book-edit");

    deleteButton.innerText = "Delete";
    editLink.innerText = "Edit";
    editLink.href = `/newbooks/${book._id}`;
    titleDiv.innerText = book.title;
    textDiv.innerHTML += tempQuill.root.innerHTML;

    deleteForm.appendChild(deleteButton);
    wrapperDiv.appendChild(titleDiv);

    wrapperDiv.appendChild(textDiv);
    wrapperDiv.appendChild(editLink);
    wrapperDiv.appendChild(deleteForm);
    bodyDiv.appendChild(wrapperDiv);

    if (book.author) {
      const authorDiv = document.createElement("div");
      authorDiv.classList.add("book-author");
      authorDiv.innerText = book.author;
      wrapperDiv.appendChild(authorDiv);
    }
  });

  const imgs = document.querySelectorAll(".text-body img");

  imgs.forEach((img) => {
    const parent = img.parentNode;
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img-wrapper");

    parent.replaceChild(imgWrapper, img);
    imgWrapper.appendChild(img);
  });
}

getContent();
