const Testimonial = require("../models/testimonial");

const { convert } = require("html-to-text");
const url = require("url");

module.exports.showTestimonials = async (req, res) => {
  const type = req.params.type;
  const testimonials = await Testimonial.find({});
  const testimonialsData = JSON.stringify(testimonials);
  res.render("testimonials", { type, testimonialsData });
};

module.exports.createTestimonial = async (req, res) => {
  const testimonial = new Testimonial({
    name: req.body.name,
    date: req.body.date,
    text: req.body.text,
    course: req.body.course,
  });

  testimonial.save().then((post) => {
    req.flash("success", "Successfully made a new testimonial!");
    res.json({ message: "Success!" });
  });
};

module.exports.updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const editedTestimonial = await Testimonial.findByIdAndUpdate(id, {
    name: req.body.name,
    date: req.body.date,
    text: req.body.text,
    course: req.body.course,
  });
  req.flash("success", "Testimonial saved!");
  res.json({ message: "Success!" });
};

module.exports.deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  await Testimonial.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted the testimonial");
  res.json({ message: "Success!" });
};
