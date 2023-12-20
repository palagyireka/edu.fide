const { userSchema, coursebookPasswordSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");
const User = require("./models/user");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in");
    return res.redirect("/");
  }
  next();
};

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateCoursebookPassword = (req, res, next) => {
  const { error } = coursebookPasswordSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect("/");
  }
  next();
};

module.exports.isValidated = (req, res, next) => {
  if (req.user) {
    if (req.user.status === "pending" && !req.cookies.verifyClosed) {
      res.locals.verify = true;
    }
  }
  next();
};

module.exports.isLoginEmailValidated = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const link = `http:///send-confirm/${user.id}`;
    if (user.status === "active") {
      next();
    } else if (user.status === "pending") {
      res.render("message", {
        message: `<h3>Please verify your email address.</h3><p>Click on <a href="${link}">this link</a> to resend the verification email.</p>`,
      });
    }
  } else {
    next(
      new ExpressError("Invalid email address or password", 401, "flashError")
    );
  }
};
