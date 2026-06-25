const { ensure } = require("../../helpers");
const { ERROR_MESSAGES, PAGINATION } = require("../../../constants/index");

const validatePagination = (page, limit) => {
  ensure(Number.isInteger(page) && page >= 1, ERROR_MESSAGES.INVALID_PAGE);

  ensure(Number.isInteger(limit) && limit >= 1, ERROR_MESSAGES.INVALID_LIMIT);

  ensure(
    limit <= PAGINATION.MAX_LIMIT,
    `Limit must not exceed ${PAGINATION.MAX_LIMIT}`,
  );
};

module.exports = {
  validatePagination,
};
