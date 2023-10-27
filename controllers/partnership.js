const Partnership = require("../models/partnership");

const { convert } = require("html-to-text");
const url = require("url");

module.exports.createPartnership = async (req, res) => {
  const newPartner = new Partnership({
    title: req.body.title,
    text: req.body.text,
    image: "",
    website: req.body.website,
    order: req.body.order,
  });

  newPartner.save().then((post) => {
    req.flash("success", "Successfully made a new partner!");
  });
};

module.exports.updatePartnerOrder = async (req, res) => {
  const ids = req.body.ids;
  const orders = req.body.orders;
  for (let i = 0; i < ids.length; i++) {
    const editedMember = await Partnership.findByIdAndUpdate(ids[i], {
      order: orders[i],
    });
  }

  req.flash("success", "Partner order saved!");
};

module.exports.updatePartnership = async (req, res) => {
  const { id } = req.params;
  const editedPartner = await Partnership.findByIdAndUpdate(id, {
    title: req.body.title,
    text: req.body.text,
    website: req.body.website,
    order: req.body.order,
  });
  req.flash("success", "Partnership saved!");
};

module.exports.deletePartner = async (req, res) => {
  const { id } = req.params;
  await Partnership.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted Partnership");
};
