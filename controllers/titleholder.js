const Titleholder = require("../models/titleholder");

const { convert } = require("html-to-text");
const url = require("url");

module.exports.createTitleholder = async (req, res) => {
  const newHolder = new Titleholder({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    fullname: req.body.fullname,
    country: req.body.country,
    fideid: req.body.fideid,
    briefdesc: req.body.briefdesc,
    year: req.body.year,
    title: req.body.title,
  });

  if (req.file) {
    newHolder.image = req.file.path;
  }

  newHolder.save().then((post) => {
    req.flash("success", "Successfully made a new titleholder!");
    res.json({ message: "Success!" });
  });
};

module.exports.updateTitleholder = async (req, res) => {
  const { id } = req.params;
  let updatedHolder;
  if (req.file) {
    updatedHolder = await Titleholder.findByIdAndUpdate(id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      fullname: req.body.fullname,
      country: req.body.country,
      fideid: req.body.fideid,
      image: req.file.path,
      briefdesc: req.body.briefdesc,
      year: req.body.year,
      title: req.body.title,
    });
  } else {
    updatedHolder = await Titleholder.findByIdAndUpdate(id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      fullname: req.body.fullname,
      country: req.body.country,
      fideid: req.body.fideid,
      briefdesc: req.body.briefdesc,
      year: req.body.year,
      title: req.body.title,
    });
  }

  req.flash("success", "Titleholder saved!");
  res.json({ message: "Success!" });
};

module.exports.deleteTitleholder = async (req, res) => {
  const { id } = req.params;
  await Titleholder.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted Titleholder");
  res.json({ message: "Success!" });
};
