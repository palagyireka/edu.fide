const User = require("../models/user");

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
    const user = new User({
      email,
      firstName,
      lastName,
      workplace,
      jobtitle,
      countryResidence,
      respCie,
      newsletter,
    });
    const registeredUser = await User.register(user, password);
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
