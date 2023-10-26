const express = require("express");
const router = express.Router();
const partnership = require("../controllers/partnership");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router
  .route("/addmember")
  .post(isAdmin, catchAsync(partnership.createPartnership));

router
  .route("/:id")
  .put(isAdmin, partnership.updatePartnership)
  .delete(isAdmin, partnership.deletePartner);

module.exports = router;
