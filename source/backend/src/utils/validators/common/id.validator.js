const { ensure } = require("../../helpers");
const { ERROR_MESSAGES } = require("@/constants");

const validateId = (id) => {
  ensure(Number.isInteger(id), ERROR_MESSAGES.INVALID_ID);
  ensure(id > 0, ERROR_MESSAGES.INVALID_ID);
};

module.exports = {
  validateId,
};
