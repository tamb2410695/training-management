const AppError = require("../../utils/errors");
const {
  ACCOUNT_STATUS,
  GENDER,
  STUDENT_STATUS,
  ERROR_MESSAGES,
  ATTENDANCE_ROUTES,
} = require("../../constants");

const { ACCOUNT_FIELDS, STUDENT_FIELDS } = require("./students.constants");

const {
  formatNumericId,
  formatAccountData,
  formatStudentData,
  formatStudentQuery,
} = require("../../utils/formatters");

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

const validateStudentFormats = (accountData, studentData) => {
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

  if (studentData) {
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

    if (hasField(studentData, "phone") && studentData.phone.trim() === "") {
      throw AppError.BadRequestError("Phone number cannot be empty");
    }
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, STUDENT_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(
    pickFields(query, STUDENT_FIELDS.QUERY.ALLOWED_KEYS),
  );
  const queryData = formatStudentQuery(rawQueryData);

  if (hasField(queryData, "page") || hasField(queryData, "limit")) {
    validatePagination(queryData.page, queryData.limit);
  }

  if (hasField(queryData, "studentStatus")) {
    validateEnum(
      queryData.studentStatus,
      Object.values(STUDENT_STATUS),
      "studentStatus",
    );
  }

  if (hasField(queryData, "gender")) {
    validateEnum(queryData.gender, Object.values(GENDER), "gender");
  }

  return queryData;
};

const validateGetById = (params) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);
  return studentId;
};

const validateCreate = (body) => {
  const allowedKeys = [
    ...ACCOUNT_FIELDS.BODY.CREATE,
    ...STUDENT_FIELDS.BODY.CREATE,
  ];
  validateAllowedFields(body, allowedKeys);

  const rawAccountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.CREATE),
  );
  const rawIns = sanitizeFields(pickFields(body, STUDENT_FIELDS.BODY.CREATE));

  validateRequiredFields(rawAccountData, ACCOUNT_FIELDS.REQUIRED.CREATE);
  validateRequiredFields(rawIns, STUDENT_FIELDS.REQUIRED.CREATE);

  const accountData = formatAccountData(rawAccountData);
  const studentData = formatStudentData(rawIns);

  validateStudentFormats(accountData, studentData);
  return { accountData, studentData };
};

const validateUpdate = (params, body) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);

  const allowedKeys = [
    ...ACCOUNT_FIELDS.BODY.UPDATE,
    ...STUDENT_FIELDS.BODY.UPDATE,
  ];
  validateAllowedFields(body, allowedKeys);

  const rawAccountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.UPDATE),
  );
  const rawStudentData = sanitizeFields(
    pickFields(body, STUDENT_FIELDS.BODY.UPDATE),
  );

  validateRequiredFields(rawAccountData, ACCOUNT_FIELDS.REQUIRED.UPDATE);
  validateRequiredFields(rawStudentData, STUDENT_FIELDS.REQUIRED.UPDATE);

  const accountData = formatAccountData(rawAccountData);
  const studentData = formatStudentData(rawStudentData);

  throwIf(
    (!accountData || Object.keys(accountData).length === 0) &&
      (!studentData || Object.keys(studentData).length === 0),
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateStudentFormats(accountData, studentData);

  return {
    studentId,
    accountData,
    studentData,
  };
};

const validatePartialUpdate = (params, body) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);

  const allowedKeys = [
    ...ACCOUNT_FIELDS.BODY.UPDATE,
    ...STUDENT_FIELDS.BODY.UPDATE,
  ];
  validateAllowedFields(body, allowedKeys);

  const rawAccountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.UPDATE),
  );
  const rawStudentData = sanitizeFields(
    pickFields(body, STUDENT_FIELDS.BODY.UPDATE),
  );

  const accountData = formatAccountData(rawAccountData);
  const studentData = formatStudentData(rawStudentData);

  throwIf(
    (!accountData || Object.keys(accountData).length === 0) &&
      (!studentData || Object.keys(studentData).length === 0),
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateStudentFormats(accountData, studentData);

  return {
    studentId,
    accountData,
    studentData,
  };
};

const validateRemove = (params) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);
  return studentId;
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
};
