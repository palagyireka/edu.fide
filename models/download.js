const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DownloadSchema = new Schema({
  author: String,
  title: String,
  lang: String,
  source: String,
  type: String,
});

module.exports = mongoose.model("Download", DownloadSchema);
