const {
  GENDER,
  ACCOUNT_STATUS,
  STUDENT_STATUS,
} = require("@/constants");
const { BadRequestError } = require("@/utils/errors");
const { hasField, throwIf } = require("@/utils/helpers");
const { STUDENT_PROFILE_FIELDS } = require("./students.constants");
const { queryValidator, validateEnum, validateEmail, validateId } = require("@/utils/validators");

const validateStudentFormats = (data) => {
  if (!data) return;

  queryValidator(
    data,
    STUDENT_PROFILE_FIELDS.QUERY.SEARCHABLE,
    STUDENT_PROFILE_FIELDS.QUERY.SORTABLE,
  );

  if (hasField(data, "accountId")) validateId(data.accountId, "accountId");

  if (hasField(data, "personalEmail")) validateEmail(data.personalEmail);

  if (hasField(data, "gender")) {
    validateEnum(data.gender, Object.values(GENDER), "gender");
  }

  if (hasField(data, "studentStatus")) {
    validateEnum(
      data.studentStatus,
      Object.values(STUDENT_STATUS),
      "studentStatus",
    );
  }

  if (hasField(data, "studentId")) {
    validateId(data.studentId);
  }

  if (hasField(data, "accountStatus")) {
    validateEnum(
      data.accountStatus,
      Object.values(ACCOUNT_STATUS),
      "accountStatus",
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
  validateStudentFormats,
};
