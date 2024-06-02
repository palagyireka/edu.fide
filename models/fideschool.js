const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FideschoolSchema = new Schema({
  name: String,
  shname: String,
  city: String,
  country: String,
  awardlevel: String,
  awarddate: String,
});

module.exports = mongoose.model("Fideschool", FideschoolSchema);
