const express = require("express");
const router = express.Router();
const commission = require("../controllers/commission");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router
  .route("/addmember")
  .post(isAdmin, catchAsync(commission.createCommissionmember));

router.route("/updateorder").put(isAdmin, commission.updateCommissionOrder);

router
  .route("/:id")
  .put(isAdmin, commission.updateCommissionmember)
  .delete(isAdmin, commission.deleteCommissionmember);

module.exports = router;
