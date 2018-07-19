const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const validateUserSignup = (userInput = {}) => {
  const errors = {};

  const { email, confirmEmail, password, confirmPassword } = userInput;

  // Check for missing inputs
  const missingFields = [];
  Object.keys(userInput).forEach(prop => {
    if (userInput[prop].length < 1) {
      return missingFields.push(prop);
    }
  });

  if (missingFields.length > 0) {
    errors["missing_fields"] = missingFields;
  }

  // Compare Passwords & Emails
  if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
    errors["password"] = "Passwords do not match.";
  }

  if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
    errors["email"] = "Emails do not match.";
  }

  errors["hasErrors"] = Object.keys(errors).length > 0 ? true : false;

  return errors;
};

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
