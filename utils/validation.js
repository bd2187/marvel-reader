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

module.exports = {
  validateUserSignup
};
