const express = require("express");
const router = express.Router();
const commission = require("../controllers/commission");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary");
const uploadImage = multer({ storage });

router
  .route("/addmember")
  .post(
    isAdmin,
    uploadImage.single("image"),
    catchAsync(commission.createCommissionmember)
  );

router.route("/updateorder").put(isAdmin, commission.updateCommissionOrder);

router
  .route("/:id")
  .put(isAdmin, uploadImage.single("image"), commission.updateCommissionmember)
  .delete(isAdmin, commission.deleteCommissionmember);

module.exports = router;
