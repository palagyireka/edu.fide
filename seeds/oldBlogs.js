if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const oldblogs = require("./wpposts");
const mongoose = require("mongoose");
const Blogpost = require("../models/blogpost");
const dbUrl = process.env.DB_URL;
const { convertHtmlToDelta } = require("node-quill-converter");

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
  await Blogpost.deleteMany({});

  for (const post of oldblogs) {
    const htmlString = post.Content;
    const delta = convertHtmlToDelta(htmlString);

    const newPost = new Blogpost({
      title: post.Title,
      image: {
        url: "https://res.cloudinary.com/dxb02rmpp/image/upload/v1692062054/blogposts/ts2kivfu34yy5y7irpw4.jpg",
        filename: "blogposts/nz64hslhsvnbshhg1sbn",
      },
      text: delta,
    });
    await newPost.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
