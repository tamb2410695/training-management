const AppError = require("../../utils/errors");
const {
  ACCOUNT_STATUS,
  GENDER,
  INSTRUCTOR_STATUS,
  ERROR_MESSAGES,
} = require("../../constants");

const {
  ACCOUNT_FIELDS,
  INSTRUCTOR_FIELDS,
} = require("./instructors.constants");

const {
  formatInstructorData,
  formatInstructorQuery,
  formatNumericId,
} = require("../../utils/formatters");

const {
  formatAccountData,
} = require("../../utils/formatters/input/accountFormatter");

const {
  pickFields,
  sanitizeFields,
  hasField,
  throwIf,
} = require("../../utils/helpers");

const {
  validateEnum,
  validateId,
  validatePagination,
  validateUsername,
  validateEmail,
  validateAllowedFields,
  validateRequiredFields,
} = require("../../utils/validators");

const validateInstructorFormats = (accountData, instructorData) => {
  if (accountData) {
    if (hasField(accountData, "username"))
      validateUsername(accountData.username);
    if (hasField(accountData, "email")) validateEmail(accountData.email);
    if (hasField(accountData, "accountStatus")) {
      validateEnum(
        accountData.accountStatus,
        Object.values(ACCOUNT_STATUS),
        "accountStatus",
      );
    }
  }

  if (instructorData) {
    if (hasField(instructorData, "gender")) {
      validateEnum(instructorData.gender, Object.values(GENDER), "gender");
    }
    if (hasField(instructorData, "instructorStatus")) {
      validateEnum(
        instructorData.instructorStatus,
        Object.values(INSTRUCTOR_STATUS),
        "instructorStatus",
      );
    }

    if (
      hasField(instructorData, "phone") &&
      instructorData.phone.trim() === ""
    ) {
      throw AppError.BadRequestError("Phone number cannot be empty");
    }
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, INSTRUCTOR_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(
    pickFields(query, INSTRUCTOR_FIELDS.QUERY.ALLOWED_KEYS),
  );
  const queryData = formatInstructorQuery(rawQueryData);

  if (hasField(queryData, "page") || hasField(queryData, "limit")) {
    validatePagination(queryData.page, queryData.limit);
  }

  if (hasField(queryData, "instructorStatus")) {
    validateEnum(
      queryData.instructorStatus,
      Object.values(INSTRUCTOR_STATUS),
      "instructorStatus",
    );
  }

  if (hasField(queryData, "gender")) {
    validateEnum(queryData.gender, Object.values(GENDER), "gender");
  }

  return queryData;
};

const validateGetById = (params) => {
  const instructorId = formatNumericId(params.id);
  validateId(instructorId);
  return instructorId;
};

const validateCreate = (body) => {
  const allowedKeys = [
    ...ACCOUNT_FIELDS.BODY.CREATE,
    ...INSTRUCTOR_FIELDS.BODY.CREATE,
  ];
  validateAllowedFields(body, allowedKeys);

  const rawAcc = sanitizeFields(pickFields(body, ACCOUNT_FIELDS.BODY.CREATE));
  const rawIns = sanitizeFields(
    pickFields(body, INSTRUCTOR_FIELDS.BODY.CREATE),
  );

  validateRequiredFields(rawAcc, ACCOUNT_FIELDS.REQUIRED.CREATE);
  validateRequiredFields(rawIns, INSTRUCTOR_FIELDS.REQUIRED.CREATE);

  const accountData = formatAccountData(rawAcc);
  const instructorData = formatInstructorData(rawIns);

  validateInstructorFormats(accountData, instructorData);
  return { accountData, instructorData };
};

const validateUpdate = (params, body) => {
  const instructorId = formatNumericId(params.id);
  validateId(instructorId);

  const allowedKeys = [
    ...ACCOUNT_FIELDS.BODY.UPDATE,
    ...INSTRUCTOR_FIELDS.BODY.UPDATE,
  ];
  validateAllowedFields(body, allowedKeys);

  const rawAccountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.UPDATE),
  );
  const rawInstructorData = sanitizeFields(
    pickFields(body, INSTRUCTOR_FIELDS.BODY.UPDATE),
  );

  validateRequiredFields(rawAccountData, ACCOUNT_FIELDS.REQUIRED.UPDATE);
  validateRequiredFields(rawInstructorData, INSTRUCTOR_FIELDS.REQUIRED.UPDATE);

  const accountData = formatAccountData(rawAccountData);
  const instructorData = formatInstructorData(rawInstructorData);

  throwIf(
    (!accountData || Object.keys(accountData).length === 0) &&
      (!instructorData || Object.keys(instructorData).length === 0),
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateInstructorFormats(accountData, instructorData);

  return {
    instructorId,
    accountData,
    instructorData,
  };
};

const validatePartialUpdate = (params, body) => {
  const instructorId = formatNumericId(params.id);
  validateId(instructorId);

  const allowedKeys = [
    ...ACCOUNT_FIELDS.BODY.UPDATE,
    ...INSTRUCTOR_FIELDS.BODY.UPDATE,
  ];
  validateAllowedFields(body, allowedKeys);

  const rawAccountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.UPDATE),
  );
  const rawInstructorData = sanitizeFields(
    pickFields(body, INSTRUCTOR_FIELDS.BODY.UPDATE),
  );

  const accountData = formatAccountData(rawAccountData);
  const instructorData = formatInstructorData(rawInstructorData);

  throwIf(
    (!accountData || Object.keys(accountData).length === 0) &&
      (!instructorData || Object.keys(instructorData).length === 0),
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateInstructorFormats(accountData, instructorData);

  return {
    instructorId,
    accountData,
    instructorData,
  };
};

const validateRemove = (params) => {
  const instructorId = formatNumericId(params.id);
  validateId(instructorId);
  return instructorId;
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
};
