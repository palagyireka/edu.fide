const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  role: { type: String, default: "basic" },
  workplace: String,
  jobtitle: String,
  countryResidence: String,
  respCie: { type: String, required: false },
  newsletter: { type: Boolean, default: false },
  verified: Boolean,
  registrationDate: Date,
});

userSchema.plugin(
  passportLocalMongoose,
  { usernameField: "email" },
  mongoosePaginate
);

module.exports = mongoose.model("User", userSchema);
