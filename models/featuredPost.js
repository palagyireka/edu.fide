const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeaturedPostSchema = new Schema({
  featuredPosts: [
    {
      post: { type: Schema.Types.ObjectId, ref: "Post" },
      featuredDate: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("FeaturedPost", FeaturedPostSchema);
