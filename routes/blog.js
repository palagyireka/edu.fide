const express = require("express");
const router = express.Router();
const blogs = require("../controllers/blog");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const catchAsync = require("../utils/catchAsync");

router
  .route("/:id")
  .get(catchAsync(blogs.blogpostRender))
  .put(upload.single("image"), blogs.edit);

router.route("/:id/edit").get(blogs.renderEdit);

router.get("/:id/edit/json", blogs.getText);

router.get("/", catchAsync(blogs.blogpostsRender));

module.exports = router;
