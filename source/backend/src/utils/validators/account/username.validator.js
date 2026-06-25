const { ensure } = require("../../helpers");
const { ERROR_MESSAGES } = require("../../../constants/index");

const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  ensure(usernameRegex.test(username), ERROR_MESSAGES.INVALID_USERNAME);
};

module.exports = {
  validateUsername,
};
