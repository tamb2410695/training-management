module.exports = {
  ...require("./input/primitives/dateFormatter"),
  ...require("./input/primitives/emailFormatter"),
  ...require("./input/primitives/enumFormatter"),
  ...require("./input/primitives/phoneFormatter"),
  ...require("./input/primitives/stringFormatter"),
  ...require("./input/primitives/usernameFormatter"),

  ...require("./input/paramsFormatter"),
  ...require("./input/queryFormatter"),
  ...require("./input/authFormatter"),
  ...require("./input/accountFormatter"),
  ...require("./input/studentFormatter"),
  ...require("./input/instructorFormatter"),
  ...require("./input/courseFormatter"),
  ...require("./input/classFormatter"),
  ...require("./input/enrollmentFormatter"),

  ...require("./response/formatAccountResponse"),
}