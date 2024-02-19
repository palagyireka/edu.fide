const SchoolAwardsApplicant = require("../models/schoolAwardsApplicant");
const nodemailer = require("../utils/nodemailer");

module.exports.renderFideSchools = (req, res) => {
  res.render("fide-schools");
};

module.exports.done = (req, res) => {
  res.render("message", {
    message: "Thank you for your application! We will get in touch.",
  });
};
module.exports.unsuccessful = (req, res) => {
  res.render("message", {
    message: "Something went wrong, please try again!",
  });
};

module.exports.sendForm = async (req, res) => {
  const newApplicant = new SchoolAwardsApplicant({
    ...req.body,
    date: new Date(),
  });

  newApplicant
    .save()
    .then(() => nodemailer.sendSchoolAwardsNotification(req.body))
    .then(() => {
      req.flash("success", "Application sent!");
      res.send();
    });
};
