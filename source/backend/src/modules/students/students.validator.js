const { BadRequestError } = require("../../utils/errors");
const { ERROR_MESSAGES } = require("../../constants");
const { STUDENT_FIELDS } = require("./students.constants");
const { formatNumericId } = require("../../utils/formatters");
const { pickFields, sanitizeFields, hasField, throwIf } = require("../../utils/helpers");
const {
  validateId,
  validatePagination,
  validateEnum,
  validateEmail,
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
} = require("../../utils/validators");

const validateStudentFormats = (studentData) => {
  if (!studentData) return;

  if (hasField(studentData, "page") || hasField(studentData, "limit")) {
    validatePagination(studentData.page, studentData.limit);
  }

  if (hasField(studentData, "accountId")) validateId(studentData.accountId, "accountId");
  
  if (hasField(studentData, "personalEmail")) validateEmail(studentData.personalEmail);

  if (hasField(studentData, "gender")) {
    validateEnum(studentData.gender, ["MALE", "FEMALE", "OTHER"], "gender");
  }

  if (hasField(studentData, "studentStatus")) {
    validateEnum(studentData.studentStatus, ["ENROLLED", "RESERVED", "DROPPED_OUT", "GRADUATED"], "studentStatus");
  }

  // Validate định dạng số điện thoại (9 - 11 số)
  if (hasField(studentData, "phone")) {
    const phoneRegex = /^[0-9]{9,11}$/;
    throwIf(!phoneRegex.test(studentData.phone), BadRequestError, "Invalid phone number format");
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, STUDENT_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(pickFields(query, STUDENT_FIELDS.QUERY.ALLOWED_KEYS));
  validateStudentFormats(rawQueryData);
  return rawQueryData;
};

const validateGetById = (params) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);
  return studentId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, STUDENT_FIELDS.BODY.CREATE);
  const sanitizedData = sanitizeFields(pickFields(body, STUDENT_FIELDS.BODY.CREATE));
  validateRequiredFields(sanitizedData, STUDENT_FIELDS.REQUIRED.CREATE);
  validateStudentFormats(sanitizedData);
  return sanitizedData;
};

const validateUpdate = (params, body) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);

  validateAllowedFields(body, STUDENT_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizeFields(pickFields(body, STUDENT_FIELDS.BODY.UPDATE));

  throwIf(!sanitizedData || Object.keys(sanitizedData).length === 0, BadRequestError, ERROR_MESSAGES.NO_VALID_FIELDS);
  validateStudentFormats(sanitizedData);

  return { studentId, studentData: sanitizedData };
};

const validatePartialUpdate = (params, body) => {
  const studentId = formatNumericId(params.id);
  validateId(studentId);

  validateAllowedFields(body, STUDENT_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizePatchBody(body, STUDENT_FIELDS.BODY.UPDATE);

  throwIf(!sanitizedData || Object.keys(sanitizedData).length === 0, BadRequestError, ERROR_MESSAGES.NO_VALID_FIELDS);
  validateStudentFormats(sanitizedData);

  return { studentId, studentData: sanitizedData };
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
};