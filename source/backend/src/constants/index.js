module.exports = {
  ...require("./system/routes"),
  ...require("./system/httpStatus"),
  ...require("./system/pagination"),

  ...require("./system/error"),
  ...require("./system/success"),

  ...require("./auth/jwt.constants"),
  ...require("./auth/roles"),

  ...require("./statuses"),

  ...require("./lookups/password"),
  ...require("./lookups/genders"),
  ...require("./lookups/queryCommonFields"),
  ...require("./lookups/codePrefix"),
  ...require("./lookups/courseLevels"),
  USER_CREATION: require("./lookups/userCreation"),
  
};
