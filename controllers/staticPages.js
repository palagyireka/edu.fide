const deltaToHtml = require("../utils/deltaToHtml");
const StaticPage = require("../models/staticPages");

module.exports.renderIntro = async (req, res) => {
  res.render("intro");
};

module.exports.renderIntroEditor = (req, res) => {
  res.render("editor");
};

module.exports.editIntro = (req, res) => {
  StaticPage.findOneAndUpdate({ page: "intro" }, { text: req.body.text }).then(
    () => {
      req.flash("success", "Edit saved!");
      res.send("ok");
    }
  );
};

module.exports.getIntroText = async (req, res) => {
  const text = await StaticPage.findOne({ page: "intro" });
  res.json(text);
};
