const express = require("express");
const router = express.Router();
const testimonial = require("../controllers/testimonial");
const { isAdmin } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");

router
  .route("/addmember")
  .post(isAdmin, catchAsync(testimonial.createTestimonial));

router
  .route("/add/:id")
  .put(isAdmin, testimonial.updateTestimonial)
  .delete(isAdmin, testimonial.deleteTestimonial);

router.route("/:type").get(testimonial.showTestimonials);

module.exports = router;
