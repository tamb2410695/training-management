const { formatNumericId } = require("@/utils/formatters/input/paramsFormatter");

const { formatAccountData } = require("../accounts/accounts.formatter");
const { validateAccountFormats } = require("../accounts/accounts.validator");

const {
  STUDENT_PROFILE_FIELDS,
  ACCOUNT_FIELDS,
} = require("./students.constants");

const {
  formatStudentQuery,
  formatStudentData,
} = require("./students.formatter");

const { validateStudentFormats } = require("./students.validator");

const { validateId } = require("@/utils/validators/common/id.validator");

const {
  validateRequiredFields,
} = require("@/utils/validators/request/requiredFields.validator");

const {
  validateAllowedFields,
} = require("@/utils/validators/request/requestFields.validator");

const { sanitizeFields, pickFields, throwIf } = require("@/utils/helpers");

const {
  sanitizePatchBody,
} = require("@/utils/validators/request/patch.validator");

const { BadRequestError } = require("@/utils/errors");

const { ERROR_MESSAGES } = require("@/constants");

const STUDENT_QUERY_FIELDS = [
  ...STUDENT_PROFILE_FIELDS.QUERY.ALLOWED_KEYS,
  ...ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS,
];

const getList = (query) => {
  validateAllowedFields(query, STUDENT_QUERY_FIELDS);

  const rawQueryData = sanitizeFields(pickFields(query, STUDENT_QUERY_FIELDS));

  const formattedQueryData = formatStudentQuery(rawQueryData);

  validateStudentFormats(formattedQueryData);

  return formattedQueryData;
};

const getById = (params) => {
  const studentId = formatNumericId(params.id);

  validateId(studentId);

  return { id: studentId };
};

const create = (body) => {
  const allowedFields = [
    ...STUDENT_PROFILE_FIELDS.BODY.CREATE,
    ...ACCOUNT_FIELDS.BODY.CREATE,
  ];

  validateAllowedFields(body, allowedFields);

  const accountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.CREATE),
  );

  const profileData = sanitizeFields(
    pickFields(body, STUDENT_PROFILE_FIELDS.BODY.CREATE),
  );

  validateRequiredFields(accountData, ACCOUNT_FIELDS.REQUIRED.CREATE);

  validateRequiredFields(profileData, STUDENT_PROFILE_FIELDS.REQUIRED.CREATE);

  const formattedAccountData = formatAccountData(accountData);

  const formattedProfileData = formatStudentData(profileData);

  validateAccountFormats(formattedAccountData);

  validateStudentFormats(formattedProfileData);

  return {
    accountData: formattedAccountData,
    profileData: formattedProfileData,
  };
};

const partialUpdate = (params, body) => {
  const studentId = formatNumericId(params.id);

  validateId(studentId);

  validateAllowedFields(body, STUDENT_PROFILE_FIELDS.BODY.UPDATE);

  const sanitizedData = sanitizePatchBody(
    body,
    STUDENT_PROFILE_FIELDS.BODY.UPDATE,
  );

  throwIf(
    Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const studentData = formatStudentData(sanitizedData);

  validateStudentFormats(studentData);

  return {
    params: studentId,
    body: studentData,
  };
};

module.exports = {
  getList,
  getById,
  create,
  partialUpdate,
};
