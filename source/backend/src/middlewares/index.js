module.exports = {
  ...require("./accounts.middleware"),
  ...require("./students.middleware"),
  ...require("./auth.middleware"),
  ...require("./error.middleware"),
  ...require("./role.middleware")
}