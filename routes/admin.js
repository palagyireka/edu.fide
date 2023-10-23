const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.get("/posts/new", isAdmin, admin.renderNew);

router
  .route("/posts")
  .get(isAdmin, admin.renderPosts)
  .post(isAdmin, catchAsync(admin.createPost));

router.get("/profiles", isAdmin, admin.showProfiles);

router
  .route("/:id")
  .get(isAdmin, catchAsync(admin.showPost))
  .put(isAdmin, admin.editPost)
  .delete(isAdmin, admin.deletePost);

router.route("/:id/edit").get(isAdmin, admin.renderEdit);

module.exports = router;
