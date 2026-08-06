module.exports = {
  ...require("./courseCategories.constants"),
  ...require("./courseCategories.controller"),
  ...require("./courseCategories.formatter"),
  ...require("./courseCategories.middleware"),
  ...require("./courseCategories.repository"),
  ...require("./courseCategories.routes"),
  ...require("./courseCategories.service"),
  ...require("./courseCategories.validator"),
};
