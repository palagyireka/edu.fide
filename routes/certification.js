const express = require("express");
const router = express.Router();
const certification = require("../controllers/certification");
const { isAdmin, validateSchoolAwardsApplicant } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router
  .route("/fide-schools-application")
  .get(certification.renderFideSchoolsApp)
  .post(validateSchoolAwardsApplicant, certification.sendForm);

router.get(
  "/fide-schools-application/successful-application",
  certification.done
);
router.get(
  "/fide-schools-application/unsuccessful",
  certification.unsuccessful
);

router.route("/fide-schools").get(certification.renderFideSchools);
router
  .route("/fide-schools/add-winner")
  .post(isAdmin, catchAsync(certification.createSchool));

router
  .route("/fide-schools/update/:id")
  .put(isAdmin, certification.updateSchool)
  .delete(isAdmin, certification.deleteSchool);

module.exports = router;
