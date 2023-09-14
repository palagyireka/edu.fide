const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");

router.get("/posts/new", admin.renderNew);

router.get("/posts", admin.renderPosts);

module.exports = router;
