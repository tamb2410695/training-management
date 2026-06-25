const { ensure } = require("../../helpers");

const validateEnum = (value, allowedValues, fieldName = "field") => {
  ensure(Array.isArray(allowedValues), `${allowedValues} must be array`);
  ensure(
    allowedValues.includes(value),
    `${fieldName} must be one of: ${allowedValues.join(", ")}`,
  );
};

module.exports = {
  validateEnum,
};
