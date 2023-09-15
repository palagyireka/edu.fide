const Blogpost = require("../models/blogpost");

module.exports.imageUpload = (req, res) => {
  res.json({ urlPath: req.file.path });
};

module.exports.getText = async (req, res) => {
  const { id } = req.params;
  const post = await Blogpost.findById(id);
  res.json(post);
};
