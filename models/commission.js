const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommissionmemberSchema = new Schema({
  name: String,
  nameLink: String,
  imgHref: String,
  email: String,
  phone: String,
  title: String,
  introduction: String,
});

module.exports = mongoose.model("Commissionmember", CommissionmemberSchema);
