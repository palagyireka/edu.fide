const express = require("express");
const router = express.Router();
const titleholder = require("../controllers/titleholder");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router
  .route("/addmember")
  .post(isAdmin, catchAsync(titleholder.createTitleholder));

router
  .route("/:id")
  .put(isAdmin, titleholder.updateTitleholder)
  .delete(isAdmin, titleholder.deleteTitleholder);

module.exports = router;
