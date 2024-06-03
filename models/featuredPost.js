const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeaturedPostSchema = new Schema({
  featuredPost: { type: Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("FeaturedPost", FeaturedPostSchema);
