const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.get("/posts/new", admin.renderNew);

router
  .route("/posts")
  .get(admin.renderPosts)
  .post(catchAsync(admin.createPost));

router.get("/profiles", admin.showProfiles);

router
  .route("/:id")
  .get(catchAsync(admin.showPost))
  .put(admin.editPost)
  .delete(admin.deletePost);

router.route("/:id/edit").get(admin.renderEdit);

module.exports = router;
