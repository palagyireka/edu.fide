const { userSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");

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
