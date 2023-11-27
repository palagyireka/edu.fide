const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const uploadImage = multer({ storage });
const api = require("../controllers/api");

router.post("/image", uploadImage.single("file"), api.imageUpload);

router.get("/listevents", api.getListEvents);
router.get("/events", api.getEvents);

router.get("/:id/json", api.getText);

router.get("/featuredid", api.getFeatured);

router.post("/search", api.search);

module.exports = router;
