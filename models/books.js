const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  text: { type: Object },
  image: { name: String, url: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", BookSchema);
