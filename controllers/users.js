const { ObjectId } = require("mongodb");
const User = require("../models/user");
const Token = require("../models/token");
var jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const {
  sendConfirmationEmail,
  sendPasswordResetEmail,
} = require("../utils/nodemailer");
const secret = process.env.SECRET || "thisshouldbesecret";
const bcrypt = require("bcryptjs");
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

  // await sendConfirmationEmail(
  //   `${firstName} ${lastName}`,
  //   email,
  //   user.confirmationCode,
  //   "https://edu.fide.com"
  // );

  res.render("message", {
    message:
      "<h3>Thank you for registering. We've sent a link to verify your email to the address you provided. Please check your inbox and follow the instructions in the email.</h3><p>If you don't see the email in your inbox, it may be in your spam or junk folder.</p><p>If you find the email in your spam folder, mark it as 'Not Spam' to ensure you receive future communications from us.</p>",
  });
};

module.exports.sendConfirmationEmailAgain = async (req, res) => {
  const user = await User.findById(new ObjectId(req.params.id));

  await sendConfirmationEmail(
    `${user.firstName} ${user.lastName}`,
    user.email,
    user.confirmationCode,
    "https://edu.fide.com"
  );

  res.render("message", {
    message:
      "<h3>We've sent a link to verify your email to the address you provided. Please check your inbox and follow the instructions in the email.</h3><p>If you don't see the email in your inbox, it may be in your spam or junk folder.</p><p>If you find the email in your spam folder, mark it as 'Not Spam' to ensure you receive future communications from us.</p>",
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

module.exports.verifyUser = async (req, res, next) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });

  if (!user) {
    throw new ExpressError("User Not found.", 404, "flashError");
  }

  user.status = "active";
  await user.save();
  res.render("message", {
    message: "<h3>Your email has been verified. Please log in.</h3>",
  });
};

module.exports.renderPasswordResetRequest = (req, res) => {
  res.render("password-reset/password-reset-request");
};

module.exports.requestPasswordReset = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ExpressError("Email does not exist", 404, "flashError");
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = await crypto.randomBytes(32).toString("hex");
  const salt = await bcrypt.genSalt(parseInt(bcryptSalt));
  const hash = await bcrypt.hash(resetToken, salt);

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `/resetpassword?token=${resetToken}&id=${user._id}`;

  await sendPasswordResetEmail(
    `${user.firstName} ${user.lastName}`,
    user.email,
    link,
    "https://edu.fide.com"
  );

  res.render("message", {
    message:
      "We've sent a link to reset your password to the email address you provided. Please check your inbox and follow the instructions in the email. If you don't see the email in your inbox, it may be in your spam folder.",
  });
};

module.exports.renderPasswordResetPage = async (req, res, next) => {
  const token = req.query.token;
  const userId = req.query.id;
  if (!token || !userId) {
    throw new ExpressError(
      "Use the link to reset your password!",
      422,
      "flashError"
    );
  }

  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new ExpressError(
      "Invalid or expired password reset token",
      401,
      "flashError"
    );
  }

  res.render("password-reset/password-reset", { token, userId });
};

module.exports.resetPassword = async (req, res, next) => {
  const { userId, token, password } = req.body;

  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new ExpressError(
      "Invalid or expired password reset token",
      401,
      "flashError"
    );
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new ExpressError(
      "Invalid or expired password reset token",
      401,
      "flashError"
    );
  }

  const user = await User.findById(userId);

  await user.setPassword(password);
  await user.save();
  await passwordResetToken.deleteOne();

  req.flash("success", "Your password has been reset");
  res.redirect("/");
};
