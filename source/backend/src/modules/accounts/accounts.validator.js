const { ROLES, ACCOUNT_STATUS } = require("@/constants");
const { ACCOUNT_FIELDS } = require("./accounts.constants");

const { hasField } = require("@/utils/helpers");
const {
  validateUsername,
  queryValidator,
  validateEmail,
  validateEnum,
} = require("@/utils/validators");

const validateAccountFormats = (data) => {
  if (!data) return;

  queryValidator(
    data,
    ACCOUNT_FIELDS.QUERY.SEARCHABLE,
    ACCOUNT_FIELDS.QUERY.SORTABLE,
  );

  if (hasField(data, "username")) {
    validateUsername(data.username);
  }

  if (hasField(data, "email")) {
    validateEmail(data.email);
  }

  if (hasField(data, "roleCode")) {
    validateEnum(data.roleCode, Object.values(ROLES), "roleCode");
  }

  if (hasField(data, "accountStatus")) {
    validateEnum(
      data.accountStatus,
      Object.values(ACCOUNT_STATUS),
      "accountStatus",
    );
  }
};

module.exports = {
  validateAccountFormats,
};
