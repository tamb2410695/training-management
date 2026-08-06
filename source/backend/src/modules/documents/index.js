module.exports = {
  ...require("./documents.constants"),
  ...require("./documents.controller"),
  ...require("./documents.formatter"),
  ...require("./documents.mapper"),
  ...require("./documents.middleware"),
  ...require("./documents.repository"),
  ...require("./documents.routes"),
  ...require("./documents.service"),
  ...require("./documents.validator"),
  ...require("./storage"),
};
