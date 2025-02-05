if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Blogpost = require("./models/blogpost");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("./models/user");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const { cloudinary } = require("./cloudinary");
const deltaToHtml = require("./utils/deltaToHtml");
const { convert } = require("html-to-text");
const cookieParser = require("cookie-parser");
const Commissionmember = require("./models/commission");
const Partnership = require("./models/partnership");
const Testimonial = require("./models/testimonial");
const Download = require("./models/download");
const Countrycontact = require("./models/countrycontact");
const FeaturedPost = require("./models/featuredPost");

const helmet = require("helmet");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const { isLoggedIn, isValidated } = require("./middleware");
const { OgMarkup, DefaultMarkup } = require("./utils/ogMarkup");

const userRoutes = require("./routes/users");
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");
const downloadRoutes = require("./routes/download");
const commissionRoutes = require("./routes/commission");
const menuRoutes = require("./routes/menu");
const staticRoutes = require("./routes/staticPages");
const potRoutes = require("./routes/pot");
const partnershipRoutes = require("./routes/partnership");
const testimonialRoutes = require("./routes/testimonial");
const titleholderRoutes = require("./routes/titleholder");
const certificationRoutes = require("./routes/certification");
const bookRoutes = require("./routes/books");
const url = require("url");

const dbUrl = process.env.DB_URL;
const secret = process.env.SECRET;
const port = process.env.PORT || 3000;

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
app.set("trust proxy", true);

app.use(methodOverride("_method"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(secret));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: secret,
  },
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

sessionConfig = {
  store,
  secret,
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.cookiesAccepted = req.cookies.cookiesAccepted;
  next();
});

app.use("/api", apiRoutes);
app.use("/newbooks", bookRoutes);
app.use("/", userRoutes);
app.use("/", menuRoutes);
app.use("/", staticRoutes);
app.use("/admin", adminRoutes);
app.use("/download", downloadRoutes);
app.use("/commission", commissionRoutes);
app.use("/pot", potRoutes);
app.use("/partnerships", partnershipRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/pot/titleholders", titleholderRoutes);
app.use("/certification", certificationRoutes);

app.get("/", isValidated, async (req, res) => {
  const featured = await FeaturedPost.findOne({}).populate(
    "featuredPosts.post"
  );
  let featuredPosts = featured
    ? featured.featuredPosts.map((fp) => fp.post)
    : [];
  featuredPosts.forEach((p) => {
    if (p.images.length === 0) {
      p.images = [{ url: "" }];
    }
    p.text = deltaToHtml(p.text);
    p.text = convert(p.text);
    p.text = p.text.replace(/\[http.*?\]/gm, "");
    const cutat = p.text.lastIndexOf(" ", 500);
    if (cutat != -1) {
      p.text = p.text.substring(0, cutat) + "...";
    }
  });
  const ogMarkup = new DefaultMarkup(req, "FIDE Chess in Education Commission");

  res.render("index", { featuredPosts, ogMarkup });
});

app.get("/search", async (req, res) => {
  const aggregate = await Blogpost.aggregate([
    {
      $project: {
        year: { $year: "$date" },
        countries: "$countries",
      },
    },
    { $unwind: "$countries" },
    {
      $group: {
        _id: null,
        distinctYears: {
          $addToSet: "$year",
        },
        distinctCountries: {
          $addToSet: "$countries",
        },
      },
    },
  ]);

  const ogMarkup = new DefaultMarkup(
    req,
    "Search - FIDE Chess in Education Commission"
  );

  res.render("search", { aggregate: aggregate[0], ogMarkup });
});

app.get("/profile", (req, res) => {
  const ogMarkup = new DefaultMarkup(
    req,
    "Profile - FIDE Chess in Education Commission - "
  );
  res.render("profile", { ogMarkup });
});

app.get("/sendus", isLoggedIn, (req, res) => {
  const ogMarkup = new DefaultMarkup(
    req,
    "Send Us - FIDE Chess in Education Commission"
  );
  res.render("sendus", { ogMarkup });
});

app.get("/onlinetools", (req, res) => {
  const ogMarkup = new DefaultMarkup(
    req,
    "Online Tools - FIDE Chess in Education Commission "
  );
  res.render("onlinetools", { ogMarkup });
});

app.get("/course-registration", (req, res) => {
  const ogMarkup = new DefaultMarkup(
    req,
    "Course Registration - FIDE Chess in Education Commission "
  );
  res.render("coursereg", { ogMarkup });
});

app.get("/commission", async (req, res) => {
  const commissionData = await Commissionmember.find().sort({ seq: 1 });

  const ogMarkup = new DefaultMarkup(
    req,
    "Commission Members - FIDE Chess in Education Commission "
  );
  res.render("commission", { commissionData, ogMarkup });
});

app.get("/partnerships", async (req, res) => {
  const partnershipMembers = await Partnership.find().sort({ order: 1 });

  const ogMarkup = new DefaultMarkup(
    req,
    "Partnerships - FIDE Chess in Education Commission "
  );
  res.render("partnerships", { partnershipMembers, ogMarkup });
});

app
  .route("/contact")
  .get(
    catchAsync(async (req, res) => {
      const countryC = decodeURIComponent(req.query.country);
      const chosenContact = await Countrycontact.findOne({ name: countryC });

      const ogMarkup = new DefaultMarkup(
        req,
        "Contact - FIDE Chess in Education Commission "
      );
      res.render("contact", { chosenContact, ogMarkup });
    })
  )
  .put(
    catchAsync(async (req, res) => {
      await Countrycontact.findOneAndUpdate(
        { name: req.body.country },
        {
          contactDelta: req.body.contactDelta,
        }
      );
      uriName = encodeURIComponent(req.body.country);

      req.method = "GET";

      req.flash("success", "Contact updated");
      res.redirect(303, `/contact?country=${uriName}`);
    })
  );

app.get("/download", isLoggedIn, async (req, res) => {
  const materials = await Download.find({});
  const downloadMaterials = JSON.stringify(materials);

  const ogMarkup = new DefaultMarkup(
    req,
    "Download Materials - FIDE Chess in Education Commission "
  );
  res.render("download", { downloadMaterials, ogMarkup });
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
  const ogMarkup = new DefaultMarkup(
    req,
    "Calendar - FIDE Chess in Education Commission "
  );
  res.render("fullcalendar", { ogMarkup });
});

app.get("/gallery", async (req, res) => {
  let imgUrls = [];
  const query = req.query.country;
  let cloudinaryExpression;
  let tags;
  const resultNumber = 10;

  if (query) {
    cloudinaryExpression = `folder:"FIDE EDU Gallery" AND tags="${query}"`;
  } else {
    cloudinaryExpression = 'folder:"FIDE EDU Gallery"/*';
  }

  await cloudinary.api.tags({ max_results: 500 }).then((result) => {
    tags = result.tags;
  });

  await cloudinary.search
    .expression(cloudinaryExpression)
    .sort_by("created_at", "desc")
    .with_field("context")
    .with_field("tags")
    .max_results(resultNumber)
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
          if (typeof img.tags !== "undefined") {
            imgObject.country = img.tags;
          }
          if (typeof img.created_at !== "undefined") {
            imgObject.createdAt = img.created_at;
          }
        }
        return imgObject;
      });
    });

  let lastPage;

  if (imgUrls.length < resultNumber) {
    lastPage = true;
  } else {
    lastPage = false;
    imgUrls.pop();
  }

  const ogMarkup = new DefaultMarkup(
    req,
    "Gallery - FIDE Chess in Education Commission "
  );

  res.render("gallery", {
    galleryUrls: imgUrls,
    countryTags: tags,
    lastPage,
    ogMarkup,
  });
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found!", 404));
});

app.use((err, req, res, next) => {
  console.log(err);
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

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
