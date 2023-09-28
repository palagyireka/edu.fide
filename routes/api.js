const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const api = require("../controllers/api");

router.post("/image", upload.single("file"), api.imageUpload);

router.get("/:id/json", api.getText);

router.get("/events", api.getEvents);

module.exports = router;
