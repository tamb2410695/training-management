const { ensure } = require("../../helpers/index");
const { ERROR_MESSAGES } = require("../../../constants/index");

const getInvalidFields = (data, allowedFields) => {
  return Object.keys(data).filter((field) => !allowedFields.includes(field));
};

const validateAllowedFields = (data, allowedFields) => {
  ensure(
    data !== null && data !== undefined,
    ERROR_MESSAGES.NO_VALID_FIELDS
  );

  const invalidFields = getInvalidFields(data, allowedFields);

  ensure(
    invalidFields.length === 0,
    `${ERROR_MESSAGES.INVALID_FIELDS}: ${invalidFields.join(", ")}`,
  );
};

module.exports = {
  getInvalidFields,
  validateAllowedFields,
};
