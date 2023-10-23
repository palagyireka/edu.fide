const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartnershipSchema = new Schema({
  title: String,
  text: String,
  image: String,
  website: String,
  order: Number,
});

module.exports = mongoose.model("Partnership", PartnershipSchema);
