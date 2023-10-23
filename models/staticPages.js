const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const StaticPageSchema = new Schema({
  text: Object,
  page: String,
  images: Array,
});

module.exports = mongoose.model("StaticPage", StaticPageSchema);
