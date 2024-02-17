const express = require("express");
const router = express.Router();
const titleholder = require("../controllers/titleholder");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const uploadImage = multer({ storage });

router
  .route("/addmember")
  .post(
    isAdmin,
    uploadImage.single("image"),
    catchAsync(titleholder.createTitleholder)
  );

router
  .route("/:id")
  .put(isAdmin, uploadImage.single("image"), titleholder.updateTitleholder)
  .delete(isAdmin, titleholder.deleteTitleholder);

module.exports = router;
