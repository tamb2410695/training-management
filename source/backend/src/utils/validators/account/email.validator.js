const { ensure } = require("../../helpers");
const { ERROR_MESSAGES } = require("../../../constants/index");

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  ensure(emailRegex.test(email), ERROR_MESSAGES.INVALID_EMAIL);
  
};

module.exports = {
  validateEmail,
};
