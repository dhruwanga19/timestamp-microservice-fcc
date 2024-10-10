const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();

app.use(cors());

function parseDate(dateString) {
  if (!dateString) {
    return new Date();
  }

  if (/^\d+$/.test(dateString)) {
    return new Date(parseInt(dateString));
  }

  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

app.get("/api/:date?", (req, res) => {
  const date = parseDate(req.params.date);

  if (!date) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

module.exports.handler = serverless(app);
