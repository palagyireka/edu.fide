if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Blogpost = require("../models/blogpost");
const dbUrl = process.env.DB_URL;
const { convertHtmlToDelta } = require("node-quill-converter");

mongoose
  .connect(
    "mongodb+srv://fideedu:Vi7HPNttt7V7KhkZ@cluster0.cwtiae2.mongodb.net/fideEduWebsite"
  )
  .catch((error) => console.log(error));

// mongoose
//   .connect("mongodb://127.0.0.1:27017/fideEdu")
//   .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  const posts = await Blogpost.find({});

  posts.forEach(async (post) => {
    post.text.ops.forEach((text) => {
      if (text.insert.image) {
        if (text.insert.image.includes("https://edu.fide.com")) {
          text.insert.image = text.insert.image.replace(
            "https://edu.fide.com",
            "https://eduarchive.fide.com"
          );
        }
      }
    });
    post.markModified("text");
    await post.save();
  });
};

seedDB();
