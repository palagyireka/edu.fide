const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommissionmemberSchema = new Schema({
  name: String,
  namelink: String,
  imgHref: String,
  email: String,
  phone: String,
  title: String,
  introduction: String,
  seq: Number,
});

module.exports = mongoose.model("Commissionmember", CommissionmemberSchema);
