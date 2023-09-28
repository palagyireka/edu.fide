const Blogpost = require("../models/blogpost");
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
