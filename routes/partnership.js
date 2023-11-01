const express = require("express");
const router = express.Router();
const partnership = require("../controllers/partnership");
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
    catchAsync(partnership.createPartnership)
  );

router.route("/modifyorder").put(isAdmin, partnership.updatePartnerOrder);

router
  .route("/:id")
  .put(isAdmin, partnership.updatePartnership)
  .delete(isAdmin, partnership.deletePartner);

module.exports = router;
