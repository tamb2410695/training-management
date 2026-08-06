module.exports = {
  ...require("./students.constants"),
  ...require("./students.controller"),
  ...require("./students.formatter"),
  ...require("./students.middleware"),
  ...require("./students.repository"),
  ...require("./students.routes"),
  ...require("./students.service"),
  ...require("./students.validator"),
};
