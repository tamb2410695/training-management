const { BadRequestError } = require("../../../utils/errors");
const { ERROR_MESSAGES } = require("../../../constants");
const { STAFF_FIELDS } = require("./profiles.constants");
const { formatNumericId } = require("../../../utils/formatters");
const { pickFields, sanitizeFields, hasField, throwIf } = require("../../../utils/helpers");
const {
  validateId,
  validatePagination,
  validateEnum,
  validateEmail,
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
} = require("../../../utils/validators");

const validateStaffFormats = (staffData) => {
  if (!staffData) return;

  if (hasField(staffData, "page") || hasField(staffData, "limit")) {
    validatePagination(staffData.page, staffData.limit);
  }

  if (hasField(staffData, "accountId")) validateId(staffData.accountId, "accountId");
  
  if (hasField(staffData, "personalEmail")) validateEmail(staffData.personalEmail);

  if (hasField(staffData, "gender")) {
    validateEnum(staffData.gender, ["MALE", "FEMALE", "OTHER"], "gender");
  }

  if (hasField(staffData, "staffStatus")) {
    validateEnum(staffData.staffStatus, ["ACTIVE", "LEAVE_OF_ABSENCE", "RETIRED", "TERMINATED"], "staffStatus");
  }

  if (hasField(staffData, "contractType")) {
    validateEnum(staffData.contractType, ["PERMANENT", "PROBATION", "PART_TIME", "SEASONAL"], "contractType");
  }

  // Validate định dạng số điện thoại cơ bản
  if (hasField(staffData, "phone")) {
    const phoneRegex = /^[0-9]{9,11}$/;
    throwIf(!phoneRegex.test(staffData.phone), BadRequestError, "Invalid phone number format");
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, STAFF_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(pickFields(query, STAFF_FIELDS.QUERY.ALLOWED_KEYS));
  if (rawQueryData.departmentId) rawQueryData.departmentId = formatNumericId(rawQueryData.departmentId);
  validateStaffFormats(rawQueryData);
  return rawQueryData;
};

const validateGetById = (params) => {
  const staffId = formatNumericId(params.id);
  validateId(staffId);
  return staffId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, STAFF_FIELDS.BODY.CREATE);
  const sanitizedData = sanitizeFields(pickFields(body, STAFF_FIELDS.BODY.CREATE));
  validateRequiredFields(sanitizedData, STAFF_FIELDS.REQUIRED.CREATE);
  validateStaffFormats(sanitizedData);
  return sanitizedData;
};

const validateUpdate = (params, body) => {
  const staffId = formatNumericId(params.id);
  validateId(staffId);

  validateAllowedFields(body, STAFF_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizeFields(pickFields(body, STAFF_FIELDS.BODY.UPDATE));

  throwIf(!sanitizedData || Object.keys(sanitizedData).length === 0, BadRequestError, ERROR_MESSAGES.NO_VALID_FIELDS);
  validateStaffFormats(sanitizedData);

  return { staffId, staffData: sanitizedData };
};

const validatePartialUpdate = (params, body) => {
  const staffId = formatNumericId(params.id);
  validateId(staffId);

  validateAllowedFields(body, STAFF_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizePatchBody(body, STAFF_FIELDS.BODY.UPDATE);

  throwIf(!sanitizedData || Object.keys(sanitizedData).length === 0, BadRequestError, ERROR_MESSAGES.NO_VALID_FIELDS);
  validateStaffFormats(sanitizedData);

  return { staffId, staffData: sanitizedData };
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
};