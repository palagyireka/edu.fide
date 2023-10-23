const express = require("express");
const router = express.Router();
const menu = require("../controllers/menu");

router
  .route("/commissionnews")
  .get(menu.renderCommissionNews)
  .post(menu.renderMoreCommissionNews);
router.get("/commissionnews/:id", menu.showCommissionNews);

router
  .route("/conferences")
  .get(menu.renderConferences)
  .post(menu.renderMoreConferences);
router.get("/conferences/:id", menu.showConferences);

router
  .route("/initiatives")
  .get(menu.renderInitiatives)
  .post(menu.renderMoreInitiatives);
router.get("/initiatives/:id", menu.showInitiatives);

router
  .route("/personalstories")
  .get(menu.renderPersonalStories)
  .post(menu.renderMorePersonalStories);
router.get("/personalstories/:id", menu.showPersonalStories);

router
  .route("/researchnews")
  .get(menu.renderResearchNews)
  .post(menu.renderMoreResearchNews);
router.get("/researchnews/:id", menu.showResearchNews);

router
  .route("/coursenews")
  .get(menu.renderCourseNews)
  .post(menu.renderMoreCourseNews);
router.get("/coursenews/:id", menu.showCourseNews);

router.route("/cienews").get(menu.renderCieNews).post(menu.renderMoreCieNews);
router.get("/cienews/:id", menu.showCieNews);

router.route("/blog").get(menu.renderBlog).post(menu.renderMoreBlog);
router.get("/blog/:id", menu.showBlog);

module.exports = router;
