if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Blogpost = require("./models/blogpost");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const User = require("./models/user");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const { cloudinary } = require("./cloudinary");
const deltaToHtml = require("./utils/deltaToHtml");
const { convert } = require("html-to-text");
const cookieParser = require("cookie-parser");

const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const { isLoggedIn, isValidated } = require("./middleware");
const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blog");
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");
const menuRoutes = require("./routes/menu");
const url = require("url");
const { sendConfirmationEmail } = require("./utils/nodemailer");

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
app.use(cookieParser(secret));

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

app.use("/api", apiRoutes);
app.use("/", userRoutes);
app.use("/", menuRoutes);
app.use("/blog", blogRoutes);
app.use("/admin", adminRoutes);

app.get("/", isValidated, async (req, res) => {
  const featuredPost = await Blogpost.findOne({ featured: true }, null, {
    sort: { date: -1 },
  });

  if (featuredPost.images.length === 0) {
    featuredPost.images = [{ url: "" }];
  }
  featuredPost.text = deltaToHtml(featuredPost.text);
  featuredPost.text = convert(featuredPost.text);
  featuredPost.text = featuredPost.text.replace(/\[http.*?\]/gm, "");

  let tag;
  if (featuredPost.tags[0] === "all") {
    tag = "blog";
  } else {
    tag = featuredPost.tags[0];
  }

  res.render("index", { featuredPost, tag });
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/intro", (req, res) => {
  res.render("intro");
});

app.get("/potcoursebook", (req, res) => {
  res.render("potcoursebook");
});

app.get("/potnfo", (req, res) => {
  res.render("potnfo");
});

app.get("/titleholders/:type", (req, res) => {
  const type = req.params.type; // Extract the 'type' parameter from the URL
  const country = decodeURIComponent(req.query.country);
  res.render("titleholders", { type, country });
});

app.get("/download", isLoggedIn, (req, res) => {
  res.render("download");
});

app.get("/sendus", isLoggedIn, (req, res) => {
  res.render("sendus");
});

app.get("/commission", (req, res) => {
  res.render("commission");
});

app.get("/partnerships", (req, res) => {
  res.render("partnerships");
});

app.get("/admin", async (req, res) => {
  const pageNumber = req.query.page || 1;

  await User.paginate(
    {},
    { page: req.query.page, limit: 50, sort: { registrationDate: -1 } }
  ).then((results) => {
    const { totalPages } = results;
    if (req.query.page > results.totalPages) {
      return res.redirect(
        url.format({
          pathname: "/admin/profiles",
          query: {
            page: results.totalPages,
          },
        })
      );
    } else {
      const userProfiles = results.docs;
      res.render("admin/admin", { userProfiles, pageNumber, totalPages });
    }
  });
});

app.get("/fullcalendar", (req, res) => {
  res.render("fullcalendar");
});

app.get("/gallery", async (req, res, next) => {
  const pageNumber = req.query.page || 1;
  const pageSize = 9;
  let imgUrls = {};
  const query = req.query.country;
  let cloudinaryExpression;
  let tags;

  if (query) {
    cloudinaryExpression = `folder:"FIDE EDU Gallery"/* AND tags=${query}`;
  } else {
    cloudinaryExpression = 'folder:"FIDE EDU Gallery"/*';
  }

  await cloudinary.search
    .expression('folder:"FIDE EDU Gallery"/*')
    .sort_by("public_id", "asc")
    .with_field("tags")
    .execute()
    .then((result) => {
      tags = result.resources.map((img) => {
        const imgObject = {};

        if (typeof img.tags !== "undefined") {
          imgObject.tags = img.tags;
        }

        return imgObject;
      });
    });

  const allCountryTags = [];

  tags.forEach((x) => {
    allCountryTags.push(...x.tags);
  });

  function uniq(a) {
    const seen = {};
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  const countryTags = uniq(allCountryTags);

  await cloudinary.search
    .expression(cloudinaryExpression)
    .sort_by("public_id", "asc")
    .with_field("context")
    .with_field("tags")
    .execute()
    .then((result) => {
      imgUrls = result.resources.map((img) => {
        const url = img.url.split("/");
        url.splice(6, 0, "c_limit,h_1000");

        const imgObject = { url: url.join("/") };

        if (typeof img.context !== "undefined") {
          if (typeof img.context.alt !== "undefined") {
            imgObject.desc = img.context.alt;
          }
          if (typeof img.context.Country !== "undefined") {
            imgObject.country = img.context.Country;
          }
        }
        return imgObject;
      });
    });

  const totalPages = Math.ceil(imgUrls.length / pageSize);

  if (req.query.page > totalPages) {
    return res.redirect(
      url.format({
        pathname: "/gallery",
        query: {
          page: totalPages,
        },
      })
    );
  } else {
    function paginate(array, pageSize, pageNumber) {
      return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }
    const galleryUrls = paginate(imgUrls, pageSize, pageNumber);

    res.render("gallery", {
      galleryUrls,
      pageNumber,
      totalPages,
      countryTags,
      query,
    });
  }
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found!", 404));
});

app.use((err, req, res, next) => {
  if (err.type === "flashError") {
    req.flash("error", err.message);
    res.redirect("/");
  } else {
    next(err);
  }
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
