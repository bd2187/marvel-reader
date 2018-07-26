const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");

// Connect to Mongo DB
mongoose
  .connect(require("./config/db"))
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Error connecting to DB"));

// Set up bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

require("./config/passport")(passport);

// Routes
const user = require("./routes/user");
const favorites = require("./routes/favorites");

app.use("/user", user);
app.use("/favorites", favorites);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Now listening to port: ${port}`);
});
