module.exports = {
  ...require("./enrollments.constants"),
  ...require("./enrollments.controller"),
  ...require("./enrollments.formatter"),
  ...require("./enrollments.middleware"),
  ...require("./enrollments.repository"),
  ...require("./enrollments.routes"),
  ...require("./enrollments.service"),
  ...require("./enrollments.validator"),
};
