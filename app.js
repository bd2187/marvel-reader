const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

// Connect to Mongo DB
mongoose
  .connect(require("./config/db"))
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Error connecting to DB"));

// Set up bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

// Routes
const user = require("./routes/user");
app.use("/user", user);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Now listening to port: ${port}`);
});
