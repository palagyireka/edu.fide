const express = require("express");
const router = express.Router();
const pot = require("../controllers/pot");

router.route("/titleholders/:type").get(pot.showTitleholders);

router.route("/potinfo").get(pot.showPotInfo).put(pot.editPotInfo);
router.get("/potinfo/edit", pot.showPotInfoEdit);
router.get("/potinfo/json", pot.getPotInfoText);

router
  .route("/coursebook/password")
  .get(pot.showPassword)
  .post(pot.sendPassword);

router.route("/coursebook").get(pot.showCoursebook);
module.exports = router;
