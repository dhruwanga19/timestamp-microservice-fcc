const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
