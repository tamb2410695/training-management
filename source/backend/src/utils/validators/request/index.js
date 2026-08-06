module.exports = {
  ...require("./patch.validator"),
  ...require("./query.validator"),
  ...require("./requestFields.validator"),
  ...require("./requiredFields.validator"),
};
