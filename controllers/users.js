const User = require("../models/user");
var jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const { sendConfirmationEmail } = require("../utils/nodemailer");
const secret = process.env.SECRET || "thisshouldbesecret";

module.exports.renderLogin = (req, res) => {
  res.render("login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Logged in!");
  res.redirect("/");
};

module.exports.renderRegister = (req, res) => {
  res.render("register");
};

module.exports.register = async (req, res, next) => {
  try {
    let {
      email,
      firstName,
      lastName,
      workplace,
      jobtitle,
      countryResidence,
      respCie,
      newsletter,
      password,
    } = req.body;

    if (newsletter) {
      newsletter = true;
    }

    const token = jwt.sign({ email }, secret);

    const user = new User({
      email,
      firstName,
      lastName,
      workplace,
      jobtitle,
      countryResidence,
      respCie,
      newsletter,
      registrationDate: new Date(),
      status: "pending",
      confirmationCode: token,
    });

    const registeredUser = await User.register(user, password);

    sendConfirmationEmail(
      `${firstName} ${lastName}`,
      email,
      user.confirmationCode
    );

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Successfully registered!");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/");
  }
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/");
  });
};

module.exports.verifyUser = async (req, res) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });

  if (!user) {
    next(new ExpressError("User Not found.", 404));
  }

  user.status = "active";
  await user.save();
  res.render("email-verify");
};
