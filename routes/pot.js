const express = require("express");
const router = express.Router();
const pot = require("../controllers/pot");
const { validateCoursebookPassword } = require("../middleware");

router.route("/titleholders/:type").get(pot.showTitleholders);

router.route("/coursebook/password").get(pot.showPassword);

router
  .route("/coursebook")
  .post(validateCoursebookPassword, pot.showCoursebook);
module.exports = router;
