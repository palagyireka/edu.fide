const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const User = require("./models/user");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const Blogpost = require("./models/blogpost");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

mongoose
  .connect("mongodb://127.0.0.1:27017/fideEdu")
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

sessionConfig = {
  secret: "notfinalsecret",
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Logged in!");
    res.redirect("/");
  }
);

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res, next) => {
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
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Successfully registered!");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/");
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/");
  });
});

app.get(
  "/blog/:id",
  catchAsync(async (req, res, next) => {
    const post = await Blogpost.findById(req.params.id);
    console.log(post);
    if (!post) {
      req.flash("error", "Cannot find this post");
      return res.redirect("/");
    }
    res.render("blog/show", { post });
  })
);

app.get("/blog", async (req, res) => {
  const blogposts = await Blogpost.find({});
  res.render("blog/blogs", { blogposts });
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found!", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Something went wrong!";
  }
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("App is listening on 3000");
});
