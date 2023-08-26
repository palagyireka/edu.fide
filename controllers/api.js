module.exports.imageUpload = (req, res) => {
  res.json({ urlPath: req.file.path });
};
