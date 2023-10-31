const Download = require("../models/download");

const { convert } = require("html-to-text");
const url = require("url");

module.exports.addMaterial = async (req, res) => {
  const newMaterial = new Download({
    author: req.body.author,
    title: req.body.title,
    lang: req.body.lang,
    source: req.body.source,
    type: req.body.type,
  });

  newMaterial.save().then((post) => {
    req.flash("success", "Successfully made a new material!");
  });
  res.json({ message: "Success!" });
};

module.exports.deleteMaterial = async (req, res) => {
  const { id } = req.params;
  await Download.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted material");
  res.json({ message: "Success!" });
};
