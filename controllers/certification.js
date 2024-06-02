const SchoolAwardsApplicant = require("../models/schoolAwardsApplicant");
const Fideschool = require("../models/fideschool");
const nodemailer = require("../utils/nodemailer");

module.exports.renderFideSchoolsApp = (req, res) => {
  res.render("fide-schools-app");
};

module.exports.renderFideSchools = async (req, res) => {
  const fideschools = await Fideschool.find({});
  let fideschoolsData = JSON.stringify(fideschools);
  fideschoolsData = JSON.parse(fideschoolsData);
  res.render("fide-schools", { fideschoolsData });
};

module.exports.createSchool = async (req, res) => {
  const fideschool = new Fideschool({
    name: req.body.name,
    country: req.body.country,
    city: req.body.city,
    awardlevel: req.body.awardlevel,
    awarddate: req.body.awarddate,
  });

  fideschool.save().then((post) => {
    req.flash("success", "Successfully added a new school!");
    res.json({ message: "Success!" });
  });
};

module.exports.updateSchool = async (req, res) => {
  const { id } = req.params;
  const editedSchool = await Fideschool.findByIdAndUpdate(id, {
    name: req.body.name,
    country: req.body.country,
    city: req.body.city,
    awardlevel: req.body.awardlevel,
    awarddate: req.body.awarddate,
  });
  req.flash("success", "School saved!");
  res.json({ message: "Success!" });
};

module.exports.deleteSchool = async (req, res) => {
  const { id } = req.params;
  await Fideschool.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted the school");
  res.json({ message: "Success!" });
};

module.exports.done = (req, res) => {
  res.render("message", {
    message:
      "Thank you for your application! We will get in touch. Remember to send us your supporting materials indexed with your chosen School ID.",
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
    .then(() => nodemailer.sendSchoolAwardsNotification(newApplicant))
    .then(() => {
      req.flash("success", "Application sent!");
      res.send();
    });
};
