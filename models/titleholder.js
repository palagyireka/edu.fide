const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TitleholderSchema = new Schema({
  firstname: String,
  lastname: String,
  fullname: String,
  country: String,
  fideid: String,
  year: Number,
  briefdesc: String,
  title: String,
});

module.exports = mongoose.model("Titleholder", TitleholderSchema);
