const { ensure } = require("../../helpers");

const validateEnum = (value, allowedValues, fieldName = "field") => {
  ensure(
    Array.isArray(allowedValues),
    `${fieldName} allowedValues must be array`,
  );

  if (Array.isArray(value)) {
    const invalidValues = value.filter((item) => !allowedValues.includes(item));
    ensure(
      invalidValues.length === 0,
      `${fieldName} contains invalid values: ${invalidValues.join(", ")}`,
    );
    return;
  }

  ensure(
    allowedValues.includes(value),
    `${fieldName} must be one of: ${allowedValues.join(", ")}`,
  );
};

module.exports = {
  validateEnum,
};
