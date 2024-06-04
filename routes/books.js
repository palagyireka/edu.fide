const express = require("express");
const router = express.Router();
const books = require("../controllers/books");

const catchAsync = require("../utils/catchAsync");

router.route("/").get(books.allBooks).post(catchAsync(books.addBook));

router.get("/new", books.bookEditor);

router
  .route("/:bookId")
  .get(books.bookEditor)
  .put(catchAsync(books.editBook))
  .delete(catchAsync(books.deleteBook));

module.exports = router;
