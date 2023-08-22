const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const BlogpostSchema = new Schema({
  title: String,
  image: [ImageSchema],
  text: { type: Object },
  date: Date,
});

BlogpostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Blogpost", BlogpostSchema);
