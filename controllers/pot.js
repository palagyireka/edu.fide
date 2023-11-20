const Titleholder = require("../models/titleholder");
const StaticPage = require("../models/staticPages");

module.exports.showTitleholders = async (req, res) => {
  const type = req.params.type;
  const country = decodeURIComponent(req.query.country);
  const titleholders = await Titleholder.find({});
  const titleholdersData = JSON.stringify(titleholders);
  res.render("pot/titleholders", { type, country, titleholdersData });
};

module.exports.showPassword = (req, res) => {
  res.render("pot/pot-coursebook-password");
};

module.exports.sendPassword = (req, res) => {
  res.redirect("/pot/coursebook");
};

module.exports.showCoursebook = (req, res) => {
  res.render("pot/potcoursebook");
};
