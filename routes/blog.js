const express = require("express");
const router = express.Router();
const blogs = require("../controllers/blog");
const catchAsync = require("../utils/catchAsync");

router.route("/:id").get(catchAsync(blogs.blogpostRender)).put(blogs.edit);

router.route("/:id/edit").get(blogs.renderEdit);

router.get("/:id/edit/json", blogs.getText);

router.get("/", catchAsync(blogs.blogpostsRender));

module.exports = router;
