const express = require("express");
const router = express.Router();
const menu = require("../controllers/menu");

router.get("/commissionnews", menu.renderCommissionNews);
router.get("/commissionnews/:id", menu.showCommissionNews);

router.get("/conferences", menu.renderConferences);
router.get("/conferences/:id", menu.showConferences);

router.get("/initiatives", menu.renderInitiatives);
router.get("/initiatives/:id", menu.showInitiatives);

router.get("/personalstories", menu.renderPersonalStories);
router.get("/personalstories/:id", menu.showPersonalStories);

router.get("/researchnews", menu.renderResearchNews);
router.get("/researchnews/:id", menu.showResearchNews);

router.get("/coursenews", menu.renderCourseNews);
router.get("/coursenews/:id", menu.showCourseNews);

router.get("/cienews", menu.renderCieNews);
router.get("/cienews/:id", menu.showCieNews);

module.exports = router;
