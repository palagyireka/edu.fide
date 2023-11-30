if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const blogposts = require("./blogs");
const mongoose = require("mongoose");
const Blogpost = require("../models/blogpost");
const dbUrl = process.env.DB_URL;

mongoose
  .connect(
    "mongodb+srv://vernyelj:DbFXR2vYE3HUFDhU@cluster0.ebvtrcv.mongodb.net/?retryWrites=true&w=majority"
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
  for (const post of blogposts) {
    const newPost = new Blogpost({
      title: post.title,
      images: {
        url: "https://res.cloudinary.com/dxb02rmpp/image/upload/v1692061181/blogposts/nz64hslhsvnbshhg1sbn.jpg",
        filename: "blogposts/nz64hslhsvnbshhg1sbn",
      },
      text: post.text,
    });
    await newPost.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
