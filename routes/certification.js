const express = require("express");
const router = express.Router();
const certification = require("../controllers/certification");
const { validateSchoolAwardsApplicant } = require("../middleware");

router
  .route("/fide-schools")
  .get(certification.renderFideSchools)
  .post(validateSchoolAwardsApplicant, certification.sendForm);

router.get("/fide-schools/successful-application", certification.done);
router.get("/fide-schools/unsuccessful", certification.unsuccessful);

module.exports = router;
