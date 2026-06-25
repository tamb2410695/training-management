const { ValidationError } = require("../../errors/index");

function ensure(condition, message) {
  if (!condition) {
    throw new ValidationError(message);
  }
}

module.exports = {
  ensure,
};
