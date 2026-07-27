const { BadRequestError } = require("../../utils/errors");
const {
  ERROR_MESSAGES,
  GENDER,
  STUDENT_STATUS,
  ACCOUNT_STATUS,
} = require("../../constants");
const { STUDENT_FIELDS, ACCOUNT_FIELDS } = require("./students.constants");
const { formatNumericId } = require("../../utils/formatters");
const {
  pickFields,
  sanitizeFields,
  hasField,
  throwIf,
} = require("../../utils/helpers");
const {
  validateId,
  validatePagination,
  validateEnum,
  validateEmail,
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
} = require("../../utils/validators");
const {
  formatStudentQuery,
  formatStudentData,
} = require("../../utils/formatters/input/studentFormatter");
const {
  formatAccountData,
} = require("../../utils/formatters/input/accountFormatter");
const {
  validateAccountFormats,
} = require("../../modules/accounts/accounts.validator");

const validateStudentFormats = (studentData) => {
  if (!studentData) return;

  if (hasField(studentData, "page") || hasField(studentData, "limit")) {
    validatePagination(studentData.page, studentData.limit);
  }

  if (hasField(studentData, "accountId"))
    validateId(studentData.accountId, "accountId");

  if (hasField(studentData, "personalEmail"))
    validateEmail(studentData.personalEmail);

  if (hasField(studentData, "gender")) {
    validateEnum(studentData.gender, Object.values(GENDER), "gender");
  }

  if (hasField(studentData, "studentStatus")) {
    validateEnum(
      studentData.studentStatus,
      Object.values(STUDENT_STATUS),
      "studentStatus",
    );
  }

  if (hasField(studentData, "accountStatus")) {
    validateEnum(
      studentData.accountStatus,
      Object.values(ACCOUNT_STATUS),
      "accountStatus",
    );
  }

  if (hasField(studentData, "phone")) {
    const phoneRegex = /^[0-9]{9,11}$/;
    throwIf(
      !phoneRegex.test(studentData.phone),
      BadRequestError,
      "Invalid phone number format",
    );
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, [
    ...STUDENT_FIELDS.QUERY.ALLOWED_KEYS,
    ...ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS,
  ]);
  const rawQueryData = sanitizeFields(
    pickFields(query, [
      ...STUDENT_FIELDS.QUERY.ALLOWED_KEYS,
      ...ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS,
    ]),
  );
  const formatedQueryData = formatStudentQuery(rawQueryData);
  validateStudentFormats(formatedQueryData);
  return formatedQueryData;
};

const validateGetById = (params) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);
  return studentId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, [
    ...STUDENT_FIELDS.BODY.CREATE,
    ...ACCOUNT_FIELDS.BODY.CREATE,
  ]);
  const rawAccountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.CREATE),
  );
  const rawProfileData = sanitizeFields(
    pickFields(body, STUDENT_FIELDS.BODY.CREATE),
  );
  validateRequiredFields(rawAccountData, ACCOUNT_FIELDS.REQUIRED.CREATE);
  validateRequiredFields(rawProfileData, STUDENT_FIELDS.REQUIRED.CREATE);
  const formatedAcountData = formatAccountData(rawAccountData);
  const formatedProfileData = formatStudentData(rawProfileData);
  validateAccountFormats(formatedAcountData);
  validateStudentFormats(formatedProfileData);
  return { accountData: formatedAcountData, profileData: formatedProfileData };
};

const validateUpdate = (params, body) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);

  validateAllowedFields(body, STUDENT_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizeFields(
    pickFields(body, STUDENT_FIELDS.BODY.UPDATE),
  );

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );
  const studentData = formatStudentData(sanitizedData);
  validateStudentFormats(studentData);
  return { params: studentId, body: studentData };
};

const validatePartialUpdate = (params, body) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);

  validateAllowedFields(body, STUDENT_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizePatchBody(body, STUDENT_FIELDS.BODY.UPDATE);

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );
  const studentData = formatStudentData(sanitizedData);
  validateStudentFormats(studentData);

  return { params: studentId, body: studentData };
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
};
