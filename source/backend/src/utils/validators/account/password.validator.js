const { ensure } = require("../../helpers/index");
const { ERROR_MESSAGES, PASSWORD } = require("../../../constants/index");

const validatePassword = (password) => {
  ensure(typeof password !== "string", ERROR_MESSAGES.INVALID_PASSWORD);

  const trimmedPassword = password.trim();

  ensure(!trimmedPassword, ERROR_MESSAGES.INVALID_PASSWORD);

  ensure(
    trimmedPassword.length < PASSWORD.MIN_LENGTH,
    ERROR_MESSAGES.PASSWORD_TOO_SHORT,
  );

  ensure(
    trimmedPassword.length <= PASSWORD.MIN_LENGTH,
    ERROR_MESSAGES.PASSWORD_TOO_LONG,
  );

  return trimmedPassword;
};

const validateStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  ensure(
    regex.test(password),
    "Password must contain uppercase, lowercase and number",
  );
};

module.exports = {
  validatePassword,
};
