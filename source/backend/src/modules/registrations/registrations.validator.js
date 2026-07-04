const { BadRequestError } = require("../../utils/errors");
const { ERROR_MESSAGES } = require("../../constants");
const { REGISTRATION_FIELDS } = require("./registrations.constants");
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

const validateRegistrationFormats = (data) => {
  if (!data) return;

  if (hasField(data, "page") || hasField(data, "limit")) {
    validatePagination(data.page, data.limit);
  }

  if (hasField(data, "personalEmail")) validateEmail(data.personalEmail);

  if (hasField(data, "registrationStatus")) {
    validateEnum(data.registrationStatus, ["PENDING", "REVIEWING", "APPROVED", "REJECTED"], "registrationStatus");
  }

  if (hasField(data, "gender")) {
    validateEnum(data.gender, ["MALE", "FEMALE", "OTHER"], "gender");
  }

  // Validate định dạng số điện thoại cơ bản (9 - 11 chữ số)
  if (hasField(data, "phone")) {
    const phoneRegex = /^[0-9]{9,11}$/;
    throwIf(!phoneRegex.test(data.phone), BadRequestError, "Invalid phone number format");
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, REGISTRATION_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(pickFields(query, REGISTRATION_FIELDS.QUERY.ALLOWED_KEYS));
  validateRegistrationFormats(rawQueryData);
  return rawQueryData;
};

const validateGetById = (params) => {
  const registrationId = formatNumericId(params.id);
  validateId(registrationId);
  return registrationId;
};

const validateGetByCode = (params) => {
  const { code } = params;
  // Khớp định dạng mã REG-YYYY-XXXXXX (Ví dụ: REG-2026-000001)
  const codeRegex = /^REG-\d{4}-\d{6}$/;
  throwIf(!codeRegex.test(code), BadRequestError, "Invalid registration code format");
  return code;
};

const validateCreate = (body) => {
  validateAllowedFields(body, REGISTRATION_FIELDS.BODY.CREATE);
  const sanitizedData = sanitizeFields(pickFields(body, REGISTRATION_FIELDS.BODY.CREATE));
  validateRequiredFields(sanitizedData, REGISTRATION_FIELDS.REQUIRED.CREATE);
  validateRegistrationFormats(sanitizedData);
  return sanitizedData;
};

const validateUpdate = (params, body) => {
  const registrationId = formatNumericId(params.id);
  validateId(registrationId);

  validateAllowedFields(body, REGISTRATION_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizeFields(pickFields(body, REGISTRATION_FIELDS.BODY.UPDATE));

  throwIf(!sanitizedData || Object.keys(sanitizedData).length === 0, BadRequestError, ERROR_MESSAGES.NO_VALID_FIELDS);
  validateRegistrationFormats(sanitizedData);

  return { registrationId, registrationData: sanitizedData };
};

const validatePartialUpdate = (params, body) => {
  const registrationId = formatNumericId(params.id);
  validateId(registrationId);

  validateAllowedFields(body, REGISTRATION_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizePatchBody(body, REGISTRATION_FIELDS.BODY.UPDATE);

  throwIf(!sanitizedData || Object.keys(sanitizedData).length === 0, BadRequestError, ERROR_MESSAGES.NO_VALID_FIELDS);
  validateRegistrationFormats(sanitizedData);

  return { registrationId, registrationData: sanitizedData };
};

module.exports = {
  validateGetList,
  validateGetById,
  validateGetByCode,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
};