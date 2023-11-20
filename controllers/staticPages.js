const deltaToHtml = require("../utils/deltaToHtml");
const StaticPage = require("../models/staticPages");

module.exports.renderPage = (route, fileUpload) => {
  return async (req, res) => {
    res.render("staticPage", { route, fileUpload });
  };
};

module.exports.renderEditor = () => {
  return (req, res) => {
    res.render("editor");
  };
};

module.exports.editPage = (page) => {
  return (req, res) => {
    StaticPage.findOneAndUpdate({ page: page }, { text: req.body.text }).then(
      (obj) => {
        req.flash("success", "Edit saved!");
        res.send("ok");
      }
    );
  };
};

module.exports.getPageContents = (page) => {
  return async (req, res) => {
    const text = await StaticPage.findOne({ page: page });
    res.json(text);
  };
};
