const Book = require("../models/books");

module.exports.allBooks = async (req, res) => {
  const books = await Book.find({});
  let booksData = JSON.stringify(books);
  booksData = JSON.parse(booksData);
  res.render("book/allBooks", { booksData });
};

module.exports.bookEditor = (req, res) => {
  res.render("book/bookEditor");
};

module.exports.addBook = async (req, res) => {
  const book = req.body;

  const image = req.file;
  const newBook = new Book({
    title: book.title,
    author: book.author,
    text: JSON.parse(book.text),

    date: new Date(),
  });
  if (image) {
    newBook.image = { name: req.file.filename, url: req.file.path };
  }

  await newBook.save();

  req.flash("success", "New book added");
  res.redirect("/newbooks");
};

module.exports.editBook = async (req, res) => {
  const bookData = {
    title: req.body.title,
    author: req.body.author,
    text: JSON.parse(req.body.text),
  };

  const image = req.file;
  if (image) {
    bookData.image = { name: req.file.filename, url: req.file.path };
    console.log(image);
  }

  const editedBook = await Book.findByIdAndUpdate(req.params.bookId, bookData);

  req.flash("success", "Updated");
  res.send("ok");
};

module.exports.deleteBook = async (req, res) => {
  const id = req.params.bookId;

  const editedBook = await Book.findByIdAndDelete(id);

  req.flash("success", "Deleted");
  res.redirect("/newbooks");
};
