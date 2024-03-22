const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
  name: String,
  date: String,
  text: String,
  course: String,
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
