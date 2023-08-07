if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const blogposts = require("./blogs");
const mongoose = require("mongoose");
const Blogpost = require("../models/blogpost");
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl).catch((error) => console.log(error));

// mongoose
//   .connect("mongodb://127.0.0.1:27017/fideEdu")
//   .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Blogpost.deleteMany({});

  for (const post of blogposts) {
    const newPost = new Blogpost({
      title: post.title,
      image: "/chess_hand.jpeg",
      text: post.text,
    });
    await newPost.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
