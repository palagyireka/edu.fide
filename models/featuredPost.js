const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeaturedPostSchema = new Schema({
  featuredPostId: { type: Schema.Types.ObjectId, ref: "Blogpost" },
});

module.exports = mongoose.model("FeaturedPost", FeaturedPostSchema);
