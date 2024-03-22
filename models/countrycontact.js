const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrycontactSchema = new Schema({
  name: String,
  "alpha-2": String,
  "country-code": String,
  email: String,
  website: String,
  contact: String,
  desc: String,
  contactDelta: Object,
});

module.exports = mongoose.model("Countrycontact", CountrycontactSchema);
