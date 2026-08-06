module.exports = {
  ...require("./dashboard.controller"),
  ...require("./dashboard.repository"),
  ...require("./dashboard.routes"),
  ...require("./dashboard.service"),
};
