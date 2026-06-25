module.exports = {
  ...require("./system/httpStatus"),
  ...require("./system/pagination"),

  ...require("./messages/errorMessages"),

  ...require("./auth/jwt.constants"),
  ...require("./auth/roles"),

  ...require("./statuses"),

  ...require("./lookups/password"),
  ...require("./lookups/genders"),
  ...require("./lookups/queryCommonFields"),
  ...require("./lookups/codePrefix"),
  ...require("./lookups/courseLevels"),
  
};
