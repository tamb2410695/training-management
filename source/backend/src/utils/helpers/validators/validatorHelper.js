const { ERROR_CODES } = require("../../../constants");
const { ValidationError } = require("../../errors/index");

function ensure(condition, message) {
  if (!condition) {
    throw new ValidationError(ERROR_CODES.VALIDATION_FAILED, message);
  }
}

module.exports = {
  ensure,
};
