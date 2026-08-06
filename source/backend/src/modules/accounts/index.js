module.exports = {
  ...require("./accounts.constants"),
  ...require("./accounts.controller"),
  ...require("./accounts.formatter"),
  ...require("./accounts.middleware"),
  ...require("./accounts.repository"),
  ...require("./accounts.routes"),
  ...require("./accounts.service"),
  ...require("./accounts.validator"),
};
