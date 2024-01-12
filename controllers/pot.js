const Titleholder = require("../models/titleholder");
const CoursebookPassword = require("../models/coursebookPassword");

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

module.exports.showCoursebook = async (req, res) => {
  const password = req.body.coursebookPw;
  const course = await CoursebookPassword.findOne({ password });

  if (!course) {
    req.flash("error", "Wrong Password!");
    res.redirect("/pot/coursebook/password");
  } else {
    res.render("pot/potcoursebook");
  }
};
