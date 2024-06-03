const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  role: { type: String, default: "basic" },
  workplace: String,
  jobtitle: String,
  countryResidence: String,
  respCie: { type: String, required: false },
  newsletter: { type: Boolean, default: false },
  registrationDate: Date,
  status: {
    type: String,
    enum: ["pending", "active"],
    default: "pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchema);
