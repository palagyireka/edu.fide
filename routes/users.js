const express = require("express");
const router = express.Router();
const passport = require("passport");
const users = require("../controllers/users");
const { validateUser, isLoginEmailValidated } = require("../middleware");
const catchAsync = require("../utils/catchAsync");

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

router
  .route("/register")
  .get(users.renderRegister)
  .post(validateUser, catchAsync(users.register));

router.get("/logout", users.logout);

router
  .route("/resetpassword")
  .get(users.renderPasswordResetPage)
  .post(catchAsync(users.resetPassword));

router
  .route("/resetpassword/request")
  .get(users.renderPasswordResetRequest)
  .post(catchAsync(users.requestPasswordReset));

router.get("/user/confirm/:confirmationCode", catchAsync(users.verifyUser));

module.exports = router;
