module.exports = {
  ...require("./error.middleware"),
  ...require("./temp/accounts.middleware"),
  ...require("./temp/students.middleware"),
  ...require("./auth.middleware"),
  ...require("./role.middleware")
}