const Titleholder = require("../models/titleholder");

const { convert } = require("html-to-text");
const url = require("url");

module.exports.createTitleholder = async (req, res) => {
  const newPartner = new Titleholder({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    fullname: req.body.fullname,
    country: req.body.country,
    fideid: req.body.fideid,
    year: req.body.year,
    briefdesc: req.body.briefdesc,
    title: req.body.title,
  });

  newPartner.save().then((post) => {
    req.flash("success", "Successfully made a new partner!");
  });
  res.json({ message: "Success!" });
};

module.exports.updateTitleholder = async (req, res) => {
  const { id } = req.params;
  const editedPartner = await Titleholder.findByIdAndUpdate(id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    fullname: req.body.fullname,
    country: req.body.country,
    fideid: req.body.fideid,
    year: req.body.year,
    briefdesc: req.body.briefdesc,
    title: req.body.title,
  });
  req.flash("success", "Titleholder saved!");
  res.json({ message: "Success!" });
};

module.exports.deleteTitleholder = async (req, res) => {
  const { id } = req.params;
  await Titleholder.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted Titleholder");
  res.json({ message: "Success!" });
};
