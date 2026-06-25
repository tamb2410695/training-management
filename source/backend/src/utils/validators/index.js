module.exports = {
  ...require("./common/enum.validator"),
  ...require("./common/id.validator"),
  ...require("./common/pagination.validator"),

  ...require("./common/requiredFields.validator"),
  ...require("./common/requestFields.validator"),
  ...require("./common/patch.validator"),
  
  ...require("./account/username.validator"),
  ...require("./account/email.validator"),
  ...require("./account/password.validator"),
  
  ...require("./student/phone.validator"),
};
