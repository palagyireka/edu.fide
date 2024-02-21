const Blogpost = require("../models/blogpost");
const FeaturedPost = require("../models/featuredPost");
const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const { google } = require("googleapis");
const { cloudinary } = require("../cloudinary");
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const projectNumber = process.env.GOOGLE_PROJECT_NUMBER;
const calendarId = process.env.GOOGLE_CALENDAR_ID;
const https = require("https");

const jwtClient = new google.auth.JWT(clientEmail, null, privateKey, SCOPES);

const calendar = google.calendar({
  version: "v3",
  project: projectNumber,
  auth: jwtClient,
});

module.exports.imageUpload = (req, res) => {
  res.json({ urlPath: req.file.path });
};

module.exports.getText = async (req, res) => {
  const { id } = req.params;
  const post = await Blogpost.findById(id);
  res.json(post);
};

module.exports.getListEvents = async (req, res) => {
  const startTime = new Date();
  startTime.setMonth(startTime.getMonth());

  calendar.events.list(
    {
      calendarId: calendarId,
      timeMin: startTime.toISOString(),
      maxResults: 1000,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: "No upcoming events found." }));
        }
      }
    }
  );
};

module.exports.getEvents = async (req, res) => {
  const startTime = new Date();
  startTime.setMonth(startTime.getMonth() - 3);

  calendar.events.list(
    {
      calendarId: calendarId,
      timeMin: startTime.toISOString(),
      maxResults: 1000,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: "No upcoming events found." }));
        }
      }
    }
  );
};

module.exports.getFeatured = async (req, res) => {
  const featured = await FeaturedPost.findOne({});
  res.send(JSON.stringify({ featured }));
};

module.exports.search = async (req, res) => {
  const transform = (posts) => {
    posts.forEach((post) => {
      if (post.images.length === 0 || !post.images[0]) {
        post.images = [{ url: "" }];
      }
      post.text = deltaToHtml(post.text);
      post.text = convert(post.text);
      post.text = post.text.replace(/\[http.*?\]/gm, "");
    });
  };

  let lastPage = false;
  const limit = 18;

  const query = { $and: [{}] };

  if (req.body.tag) {
    req.body.tag !== "" ? query.$and.push({ tags: req.body.tag }) : null;
  }
  if (req.body.country) {
    req.body.country !== ""
      ? query.$and.push({ countries: req.body.country })
      : null;
  }
  if (req.body.year) {
    req.body.year !== ""
      ? query.$and.push({
          $expr: { $eq: [{ $year: "$date" }, parseInt(req.body.year)] },
        })
      : null;
  }

  const results = await Blogpost.aggregate([
    { $match: query },
    {
      $facet: {
        data: [
          { $match: { date: { $lt: new Date(req.body.lastDate) } } },
          { $sort: { date: -1 } },
          { $limit: limit },
        ],
        totalPages: [{ $count: "count" }],
      },
    },
  ]);

  let totalPages;

  if (!results[0].totalPages[0]) {
    totalPages = 1;
  } else {
    totalPages = results[0].totalPages[0].count;
  }

  if (req.body.pageNumber * limit >= totalPages) {
    lastPage = true;
  }

  posts = results[0].data;
  transform(posts);

  res.json({ posts, lastPage });
};

module.exports.gallery = async (req, res) => {
  console.log(req.body);
  const query = req.body.country;
  const createdAt = req.body.lastDate;
  let imgUrls;
  let expression;
  let lastPage = false;

  if (query === "" || query === null) {
    expression = 'folder:"FIDE EDU Gallery"';
  } else {
    expression = `folder:"FIDE EDU Gallery" AND tags="${query}"`;
  }

  if (createdAt !== "") {
    expression += ` AND created_at<"${createdAt}"`;
  }
  console.log(expression);
  await cloudinary.search
    .expression(expression)
    .sort_by("created_at", "desc")
    .with_field("context")
    .with_field("tags")
    .max_results(10)
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
        }
        imgObject.createdAt = img.created_at;

        return imgObject;
      });
    });

  if (imgUrls.length < 10) {
    lastPage = true;
  } else {
    imgUrls.pop();
  }

  res.json({ imgUrls, lastPage });
};

module.exports.getIp = (req, res) => {
  let url = `https://api.ip2location.io/?key=F68B4C8DEFCC6B4B2418CFEDDCBC2B87&ip=8.8.8.8&format=json`;

  let response = "";
  let request = https.get(url, function (resp) {
    resp.on("data", (chunk) => (response = response + chunk));
    resp.on("end", function () {
      res.json(response);
    });
  });
};
