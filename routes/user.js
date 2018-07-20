const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const { validateUserSignup } = require("../utils/validation");

/**
 * Route: /user/signup
 * Desc: Save new user info to DB
 * Public Route
 */
router.post("/signup", (req, res) => {
  const errors = validateUserSignup(req.body);
  const { username, email, password } = req.body;

  if (errors.hasErrors) {
    return res.json(errors);
  }

  // Hash Password
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      // Check if email and username is already taken
      let promise = User.findOne({ email }).exec();

      promise
        .then(existingUser => {
          // If user exists throw an error
          if (existingUser) {
            throw "User already exists";
          }

          var newUser = new User({
            username,
            email,
            password: hash
          });

          // Save User
          return newUser.save();
        })
        .then(data => {
          // If the user was saved to the DB successfully, send relevant data back to client as JSON
          const { email, username } = data;
          res.json({ email, username, success: true });
        })
        .catch(err => res.json({ error: true, msg: err }));
    });
  });
});

module.exports = router;
