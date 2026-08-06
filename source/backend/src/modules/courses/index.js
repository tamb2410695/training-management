module.exports = {
  ...require("./courses.constants"),
  ...require("./courses.controller"),
  ...require("./courses.formatter"),
  ...require("./courses.middleware"),
  ...require("./courses.repository"),
  ...require("./courses.routes"),
  ...require("./courses.service"),
  ...require("./courses.validator"),
};
