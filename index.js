if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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
const methodOverride = require("method-override");
const deltaToHtml = require("./utils/deltaToHtml");
const { convert } = require("html-to-text");
const multer = require("multer");
const { storage } = require("./cloudinary");
const upload = multer({ storage });
const url = require("url");

const dbUrl = process.env.DB_URL;
const secret = process.env.SECRET || "thisshouldbesecret";

mongoose.connect(dbUrl).catch((error) => console.log(error));

// mongoose
//   .connect("mongodb://127.0.0.1:27017/fideEdu")
//   .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sessionConfig = {
  secret,
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

app.get("/intro", (req, res) => {
  res.render("intro");
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
  catchAsync(async (req, res) => {
    const post = await Blogpost.findById(req.params.id);
    if (!post) {
      req.flash("error", "Cannot find this post");
      return res.redirect("/");
    }
    post.text = deltaToHtml(post.text);

    res.render("blog/show", { post });
  })
);

app.get("/blog/:id/edit", async (req, res) => {
  res.render("blog/edit");
});

app.get("/blog/:id/edit/json", async (req, res) => {
  const { id } = req.params;
  const post = await Blogpost.findById(id);
  console.log(post);
  res.json(post);
});

app.put("/blog/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const editedPost = await Blogpost.findByIdAndUpdate(
    id,
    { title: req.body.title, text: req.body.text },
    { new: true }
  );

  if (req.file) {
    editedPost.image[0] = { url: req.file.path, imageId: req.file.filename };
    await editedPost.save();
  }
  if (editedPost) {
    req.flash("success", "Post saved!");
  } else {
    req.flash("error", "Something went wrong!");
  }
});

app.get(
  "/blog",
  catchAsync(async (req, res) => {
    const pageNumber = req.query.page || 1;
    let blogposts;
    console.log(pageNumber);
    const transform = (blogs) => {
      blogs.forEach((post) => {
        post.text = deltaToHtml(post.text);
        post.text = convert(post.text);
        let charLength;
        if (post.text.length >= 200) {
          charLength = -(post.text.length - 200);
        } else {
          charLength = undefined;
        }
        post.text = post.text.slice(0, charLength);
      });
    };

    Blogpost.paginate({}, { page: req.query.page, limit: 12 }).then(
      (results) => {
        const { totalPages } = results;
        if (req.query.page > results.totalPages) {
          return res.redirect(
            url.format({
              pathname: "/blog",
              query: {
                page: results.totalPages,
              },
            })
          );
        } else {
          blogposts = results.docs;

          transform(blogposts);
        }
        res.render("blog/blogs", { blogposts, pageNumber, totalPages });
      }
    );
  })
);

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
