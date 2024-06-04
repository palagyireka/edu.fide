const Book = require("../models/books");

module.exports.allBooks = (req, res) => {
  res.render("book/allBooks");
};

module.exports.bookEditor = (req, res) => {
  res.render("book/bookEditor");
};

module.exports.addBook = async (req, res) => {
  const book = req.body;

  const newBook = new Book({ ...book, date: new Date() });
  await newBook.save();

  req.flash("success", "New book added");
  res.redirect("/newbooks");
};

module.exports.editBook = async (req, res) => {
  const book = req.body;

  const editedBook = await Book.findByIdAndUpdate(req.params.bookId, book);

  req.flash("success", "Updated");
  res.send("ok");
};

module.exports.deleteBook = async (req, res) => {
  const id = req.params.bookId;

  const editedBook = await Book.findByIdAndDelete(id);

  req.flash("success", "Deleted");
  res.redirect("/newbooks");
};
