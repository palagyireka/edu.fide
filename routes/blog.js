const express = require("express");
const router = express.Router();
const blogs = require("../controllers/blog");
const catchAsync = require("../utils/catchAsync");
const { isAdmin } = require("../middleware");

router.route("/").get(catchAsync(blogs.blogpostsRender)).post(blogs.createPost);

router.get("/new", blogs.renderNew);

router
  .route("/:id")
  .get(catchAsync(blogs.blogpostRender))
  .put(blogs.edit)
  .delete(isAdmin, blogs.delete);

router.route("/:id/edit").get(blogs.renderEdit);

router.get("/:id/edit/json", blogs.getText);

module.exports = router;
