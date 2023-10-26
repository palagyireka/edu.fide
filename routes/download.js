const express = require("express");
const router = express.Router();
const download = require("../controllers/download");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

router.route("/addmaterial").post(isAdmin, catchAsync(download.addMaterial));

router.route("/:id").delete(isAdmin, download.deleteMaterial);

module.exports = router;
