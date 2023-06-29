require("dotenv").config();

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ mssg: "Hello World" });
});

// listen for request
app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
