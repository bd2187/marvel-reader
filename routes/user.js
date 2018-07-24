const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const key = require("../config/key");
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

/**
 * Route: /user/login
 * Desc: Log in user
 * Public Route
 */
router.post("/login", function(req, res) {
  const { username, password } = req.body;

  // Find user in DB
  let promise = User.findOne({ username }).exec();

  promise
    .then(user => {
      // If User doesn't exist, send error message
      if (!user) {
        return res.json({ status: "fail", msg: "user not found" });
      }

      // Compare password User's password from req.body to user.password from DB
      bcrypt.compare(password, user.password).then(isMatch => {
        // If password doesn't match, return error message
        if (!isMatch) {
          return res.json({ status: "fail", msg: "password incorrect" });
        }

        // Create payload
        const payload = {
          username: user.username,
          email: user.email,
          signUpDate: user.signUpDate
        };

        // Sign token with 1 hour expiration date
        return jwt.sign(payload, key, { expiresIn: 3600000 }, (err, token) => {
          if (err) {
            return res.json({
              status: "fail",
              err
            });
          }

          res.json({
            status: "success",
            token: `Bearer ${token}`
          });
        });
      });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
