const { GENDER, STAFF_STATUS } = require("@/constants");
const { BadRequestError } = require("@/utils/errors");
const { hasField, throwIf } = require("@/utils/helpers");
const { queryValidator, validateId, validateEmail, validateEnum } = require("@/utils/validators");
const { STAFF_PROFILE_FIELDS } = require("./staffs.constants");

const validateStaffFormats = (data) => {
  if (!data) return;

  queryValidator(
    data,
    STAFF_PROFILE_FIELDS.QUERY.SEARCHABLE,
    STAFF_PROFILE_FIELDS.QUERY.SORTABLE,
  );

  if (hasField(data, "accountId"))
    validateId(data.accountId, "accountId");

  if (hasField(data, "staffId"))
    validateId(data.staffId, "staffId");


  if (hasField(data, "personalEmail"))
    validateEmail(data.personalEmail);

  if (hasField(data, "gender")) {
    validateEnum(data.gender, Object.values(GENDER), "gender");
  }

  if (hasField(data, "staffStatus")) {
    validateEnum(
      data.staffStatus,
      Object.values(STAFF_STATUS),
      "staffStatus",
    );
  }
  
  if (hasField(data, "phone")) {
    const phoneRegex = /^[0-9]{9,11}$/;
    throwIf(
      !phoneRegex.test(data.phone),
      BadRequestError,
      "Invalid phone number format",
    );
  }
};

module.exports = {
  validateStaffFormats
}