module.exports = {
  ...require("./auth.middleware"),
  ...require("./error.middleware"),
  ...require("./role.middleware"),
};
