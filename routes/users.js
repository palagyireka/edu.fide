const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const users = require("../controllers/users");

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/",
    }),
    users.login
  );

router.route("/register").get(users.renderRegister).post(users.register);

router.get("/logout", users.logout);

module.exports = router;
