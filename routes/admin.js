const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.get("/posts/new", admin.renderNew);

router.get("/posts", admin.renderPosts);

router
  .route("/:id")
  .get(catchAsync(admin.showPost))
  .put(admin.editPost)
  .delete(isAdmin, admin.deletePost);

router.route("/:id/edit").get(admin.renderEdit);

module.exports = router;
