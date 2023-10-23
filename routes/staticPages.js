const express = require("express");
const router = express.Router();
const staticPages = require("../controllers/staticPages");

router.route("/intro").get(staticPages.renderIntro).put(staticPages.editIntro);
router.get("/intro/edit", staticPages.renderIntroEditor);
router.get("/intro/json", staticPages.getIntroText);

module.exports = router;
