const express = require("express");
const router = express.Router();
const User = require("../models/User");

const validateUserSignup = (userInput = {}) => {
  const errors = {};

  const {
    username,
    email,
    confirmEmail,
    password,
    confirmPassword
  } = userInput;

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

  errors["errors"] = Object.keys(errors).length > 0 ? true : false;

  return errors;
};

// User Sign Up
router.post("/signup", (req, res) => {
  const errors = validateUserSignup(req.body);

  if (errors.errors) {
    res.json(errors);
  } else {
    res.json({
      success: true
    });
  }

  // Hash Password

  // Save User to DB
  // res.json({
  //   success: true
  // });
});

module.exports = router;
