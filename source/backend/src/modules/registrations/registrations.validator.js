const { GENDER, REGISTRATION_STATUS } = require("@/constants");
const { REGISTRATION_FIELDS } = require("./registrations.constants");
const {
  validateId,
  validateEnum,
  validateEmail,
  validateUsername,
  queryValidator,
  hasField,
} = require("@/utils");

const validateRegistrationFormats = (data) => {
  if (!data) return;

  queryValidator(
    data,
    REGISTRATION_FIELDS.QUERY.SEARCHABLE,
    REGISTRATION_FIELDS.QUERY.SORTABLE,
  );

  if (hasField(data, "accountId")) validateId(data.accountId, "accountId");

  if (hasField(data, "username")) {
    validateUsername(data.username);
  }

  if (hasField(data, "email")) {
    validateEmail(data.email);
  }

  if (hasField(data, "personalEmail")) validateEmail(data.personalEmail);

  if (hasField(data, "registrationStatus")) {
    validateEnum(
      data.registrationStatus,
      Object.values(REGISTRATION_STATUS),
      "registrationStatus",
    );
  }

  if (hasField(data, "gender")) {
    validateEnum(data.gender, Object.values(GENDER), "gender");
  }
};

module.exports = {
  validateRegistrationFormats,
};
