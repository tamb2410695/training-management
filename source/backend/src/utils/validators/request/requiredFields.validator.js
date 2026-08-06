const { ensure } = require("../../helpers/index");
const { ERROR_MESSAGES } = require("@/constants");

const getMissingFields = (data, requiredFields) => {
  return requiredFields.filter(
    (field) =>
      data[field] === undefined || data[field] === null || data[field] === "",
  );
};

const validateRequiredFields = (data, requiredFields) => {
  const missingFields = getMissingFields(data, requiredFields);

  ensure(
    missingFields.length === 0,
    `${ERROR_MESSAGES.MISSING_REQUIRED_FIELDS}: ${missingFields.join(", ")}`,
  );
};

module.exports = {
  getMissingFields,
  validateRequiredFields,
};
