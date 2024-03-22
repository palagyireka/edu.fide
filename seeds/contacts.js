if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { convertHtmlToDelta } = require("node-quill-converter");
const Countrycontact = require("../models/countrycontact");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://vernyelj:DbFXR2vYE3HUFDhU@cluster0.ebvtrcv.mongodb.net/fideEduWebsite"
  )
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const reveal = async () => {
  const contacts = await Countrycontact.find({});

  for (const country of contacts) {
    let contactHtml;
    let emailHtml;
    let websiteHtml;
    let fullHtml = "";

    if (country.contact && country.contact != "") {
      contactHtml = `<p>Contact: ${country.contact}</p>`;
      fullHtml += contactHtml;
    }
    if (country.email && country.email != "") {
      emailHtml = `<p>Email: ${country.email}</p>`;
      fullHtml += emailHtml;
    }
    if (country.website && country.website != "") {
      websiteHtml = `<p>Website: <a href="${country.website}" target="_blank">${country.website}</a></p>`;
      fullHtml += websiteHtml;
    }

    const delta = convertHtmlToDelta(fullHtml);

    country.contactDelta = delta;
    await country.save();
  }
};

reveal().then(() => {
  mongoose.connection.close();
});
