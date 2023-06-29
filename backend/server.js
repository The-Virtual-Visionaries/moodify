require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const moodifyRoutes = require("./routes/index");

const app = express();

// middleware
app.get("/", (req, res) => {
  res.json({ mssg: "Hello World" });
});

// routes
app.use(moodifyRoutes);

// connect to mongodb
const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    })
  )
  .catch((err) => console.log(err));

// listen for request
