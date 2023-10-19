const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TitleholderSchema = new Schema({
  firstname: String,
  lastname: String,
  fullname: String,
  country: String,
  fideid: String,
  awarddate: String,
  year: Number,
  title: String,
});

module.exports = mongoose.model("Titleholder", TitleholderSchema);
