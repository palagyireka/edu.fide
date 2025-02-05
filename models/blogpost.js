const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const BlogpostSchema = new Schema({
  title: String,
  images: [ImageSchema],
  text: { type: Object },
  date: Date,
  tags: Array,
  countries: Array,
  featured: Boolean,
});

BlogpostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", BlogpostSchema);
