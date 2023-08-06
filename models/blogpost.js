const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogpostSchema = new Schema({
  title: String,
  image: String,
  text: String,
});

module.exports = mongoose.model("Blogpost", BlogpostSchema);
