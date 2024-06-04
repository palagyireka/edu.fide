const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  text: { type: Object },
  date: Date,
});

module.exports = mongoose.model("Book", BookSchema);
