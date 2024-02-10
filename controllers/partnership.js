const Partnership = require("../models/partnership");

const { convert } = require("html-to-text");
const url = require("url");

module.exports.createPartnership = async (req, res) => {
  const partnership = new Partnership({
    title: req.body.title,
    text: req.body.text,
    website: req.body.website,
    order: req.body.order,
  });

  if (req.file) {
    partnership.image = req.file.path;
  }

  partnership.save().then((post) => {
    req.flash("success", "Successfully made a new partner!");
    res.json({ message: "Success!" });
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
  res.json({ message: "Success!" });
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
  res.json({ message: "Success!" });
};

module.exports.deletePartner = async (req, res) => {
  const { id } = req.params;
  await Partnership.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted Partnership");
  res.json({ message: "Success!" });
};
