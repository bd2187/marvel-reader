const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Now listening to port: ${port}`);
});
