const Blogpost = require("../models/blogpost");
const FeaturedPost = require("../models/featuredPost");
const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const { google } = require("googleapis");
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const projectNumber = process.env.GOOGLE_PROJECT_NUMBER;
const calendarId = process.env.GOOGLE_CALENDAR_ID;

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
