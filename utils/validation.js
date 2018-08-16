const validateUserSignup = (userInput = {}) => {
  let errors = [];

  const { email, confirmEmail, password, confirmPassword } = userInput;

  // Check for missing inputs

  Object.keys(userInput).forEach(prop => {
    if (userInput[prop].length < 1) {
      // return missingFields.push(prop);
      switch (prop) {
        case "username":
          errors.push("Username is required.");
          break;
        case "password":
          errors.push("Password is required.");
          break;
        case "confirmPassword":
          errors.push("Please confirm your password");
          break;
        case "email":
          errors.push("Email is required.");
          break;
        case "confirmEmail":
          errors.push("Please confirm your email");
          break;
        default:
          errors.push("One or more fields is missing");
      }
    }
  });

  // Compare Passwords & Emails
  if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
    // errors["password"] = "Passwords do not match.";
    errors.push("Passwords do not match.");
  }

  if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
    errors.push("Emails do not match.");
  }

  return errors;
};

module.exports = {
  validateUserSignup
};
