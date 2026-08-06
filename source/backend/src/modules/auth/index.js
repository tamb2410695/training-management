module.exports = {
  ...require("./auth.constants"),
  ...require("./auth.controller"),
  ...require("./auth.formatter"),
  ...require("./auth.routes"),
  ...require("./auth.service"),
  ...require("./auth.validator"),
};
