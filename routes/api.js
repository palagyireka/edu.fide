const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const api = require("../controllers/api");

router.post("/image", upload.single("file"), api.imageUpload);

router.get("/listevents", api.getListEvents);
router.get("/events", api.getEvents);

router.get("/intro", api.getIntro);

router.get("/:id/json", api.getText);

module.exports = router;
