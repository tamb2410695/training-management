const {
  validateAllowedFields,
} = require("@/utils/validators/request/requestFields.validator");

const {
  validateRequiredFields,
} = require("@/utils/validators/request/requiredFields.validator");

const {
  sanitizePatchBody,
} = require("@/utils/validators/request/patch.validator");

const { sanitizeFields, pickFields, throwIf } = require("@/utils/helpers");

const { formatNumericId } = require("@/utils/formatters/input/paramsFormatter");

const { validateId } = require("@/utils/validators/common/id.validator");

const { BadRequestError } = require("@/utils/errors");

const { ERROR_MESSAGES } = require("@/constants");

const { REGISTRATION_FIELDS } = require("./registrations.constants");

const { validateRegistrationFormats } = require("./registrations.validator");

const {
  formatRegistrationData,
  formatRegistrationQuery,
} = require("./registrations.formatter");

// ===============================
// Query
// ===============================

const getList = (query) => {
  validateAllowedFields(query, REGISTRATION_FIELDS.QUERY.ALLOWED_KEYS);

  const rawQueryData = sanitizeFields(
    pickFields(query, REGISTRATION_FIELDS.QUERY.ALLOWED_KEYS),
  );

  const registrationQuery = formatRegistrationQuery(rawQueryData);

  validateRegistrationFormats(registrationQuery);

  return registrationQuery;
};

// ===============================
// Params
// ===============================

const getById = (params) => {
  const registrationId = formatNumericId(params.id);

  validateId(registrationId);

  return registrationId;
};

// ===============================
// CRUD
// ===============================

const create = (body) => {
  validateAllowedFields(body, REGISTRATION_FIELDS.BODY.CREATE);

  const sanitizedData = sanitizeFields(
    pickFields(body, REGISTRATION_FIELDS.BODY.CREATE),
  );

  validateRequiredFields(sanitizedData, REGISTRATION_FIELDS.REQUIRED.CREATE);

  const registrationData = formatRegistrationData(sanitizedData);

  validateRegistrationFormats(registrationData);

  return registrationData;
};

const partialUpdate = (params, body) => {
  const registrationId = getById(params);

  const sanitizedData = sanitizePatchBody(
    body,
    REGISTRATION_FIELDS.BODY.UPDATE,
  );

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,

    BadRequestError,

    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const registrationData = formatRegistrationData(sanitizedData);

  validateRegistrationFormats(registrationData);

  return {
    params: registrationId,
    body: registrationData,
  };
};

// ===============================
// Business Actions
// ===============================

const approve = (params, body) => {
  const registrationId = getById(params);

  validateAllowedFields(body, REGISTRATION_FIELDS.BODY.APPROVE);

  const sanitizedData = sanitizeFields(
    pickFields(body, REGISTRATION_FIELDS.BODY.APPROVE),
  );

  return {
    params: registrationId,
    body: sanitizedData,
  };
};

const reject = (params) => {
  return getById(params);
};

module.exports = {
  getList,
  getById,

  create,
  partialUpdate,

  approve,
  reject,
};
