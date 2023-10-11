const User = require("../models/user");
const Token = require("../models/token");
var jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const {
  sendConfirmationEmail,
  sendPasswordResetEmail,
} = require("../utils/nodemailer");
const secret = process.env.SECRET || "thisshouldbesecret";
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const bcryptSalt = process.env.BYCRYPT_SALT;

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

  let user = await User.findOne({ email });

  if (user) {
    req.flash("error", "This email has already been registered!");
    res.redirect("/");
  }

  const token = jwt.sign({ email }, secret);

  user = new User({
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

  await sendConfirmationEmail(
    `${firstName} ${lastName}`,
    email,
    user.confirmationCode
  );

  req.login(registeredUser, (err) => {
    if (err) return next(err);
    req.flash("success", "Successfully registered!");
    res.redirect("/");
  });
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
    next(new ExpressError("User Not found.", 404, "flashError"));
  }

  user.status = "active";
  await user.save();
  res.render("email-verify");
};

module.exports.requestPasswordReset = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new ExpressError("Email does not exist", 404, "flashError"));
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = bcrypt.hash(resetToken, bcryptSalt);

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `/passwordReset?token=${resetToken}&id=${user._id}`;

  await sendPasswordResetEmail(
    `${user.firstName} ${user.lastName}`,
    user.email,
    link
  );

  res.render("password-reset-requested");
};

module.exports.renderPasswordResetPage = (req, res) => {
  res.render("password-reset");
};

module.exports.resetPassword = async (req, res, next) => {
  const { userId, token, password } = req.body;

  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    next(
      new ExpressError(
        "Invalid or expired password reset token",
        401,
        "flashError"
      )
    );
  }

  const isValid = bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    next(
      new ExpressError(
        "Invalid or expired password reset token",
        401,
        "flashError"
      )
    );
  }

  const user = await User.findById(userId);

  await user.setPassword(password);
  await user.save();
  await passwordResetToken.deleteOne();

  req.flash("success", "Your password has been reset");
  res.redirect("/");
};
