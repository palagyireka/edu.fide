const express = require("express");
const router = express.Router();
const books = require("../controllers/books");
const multer = require("multer");
const { storage } = require("../cloudinary");
const uploadImage = multer({ storage });

const catchAsync = require("../utils/catchAsync");

router
  .route("/")
  .get(books.allBooks)
  .post(uploadImage.single("image"), books.addBook);

router.get("/new", books.bookEditor);

router
  .route("/:bookId")
  .get(books.bookEditor)
  .put(uploadImage.single("image"), catchAsync(books.editBook))
  .delete(catchAsync(books.deleteBook));

module.exports = router;
