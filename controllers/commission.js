const Commissionmember = require("../models/commission");

const { convert } = require("html-to-text");
const url = require("url");

module.exports.createCommissionmember = async (req, res) => {
  const newMember = new Commissionmember({
    name: req.body.name,
    namelink: req.body.namelink,
    email: req.body.email,
    phone: req.body.phone,
    title: req.body.title,
    introduction: req.body.introduction,
    seq: req.body.seq,
  });

  if (req.file) {
    newMember.imgHref = req.file.path;
  }

  newMember.save().then((post) => {
    req.flash("success", "Successfully made a new commission member!");
    res.json({ message: "Success!" });
  });
};

module.exports.updateCommissionOrder = async (req, res) => {
  const ids = req.body.ids;
  const orders = req.body.orders;
  for (let i = 0; i < ids.length; i++) {
    const editedMember = await Commissionmember.findByIdAndUpdate(ids[i], {
      seq: orders[i],
    });
  }

  req.flash("success", "Commission member saved!");
  res.json({ message: "Success!" });
};

module.exports.updateCommissionmember = async (req, res) => {
  const { id } = req.params;

  let editedMember;

  if (req.file) {
    editedMember = await Commissionmember.findByIdAndUpdate(id, {
      name: req.body.name,
      namelink: req.body.namelink,
      email: req.body.email,
      phone: req.body.phone,
      title: req.body.title,
      introduction: req.body.introduction,
      seq: req.body.seq,
      imgHref: req.file.path,
    });
  } else {
    editedMember = await Commissionmember.findByIdAndUpdate(id, {
      name: req.body.name,
      namelink: req.body.namelink,
      email: req.body.email,
      phone: req.body.phone,
      title: req.body.title,
      introduction: req.body.introduction,
      seq: req.body.seq,
    });
  }

  req.flash("success", "Commission member saved!");
  res.json({ message: "Success!" });
};

module.exports.deleteCommissionmember = async (req, res) => {
  const { id } = req.params;
  await Commissionmember.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted commission member");
  res.json({ message: "Success!" });
};
