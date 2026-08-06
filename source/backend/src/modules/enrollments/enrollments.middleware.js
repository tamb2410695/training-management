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

const { ENROLLMENT_FIELDS } = require("./enrollments.constants");

const { validateEnrollmentFormats } = require("./enrollments.validator");

const {
  formatEnrollmentData,
  formatEnrollmentQuery,
} = require("./enrollments.formatter");

// ===============================
// Query
// ===============================

const getList = (query) => {
  validateAllowedFields(
    query,

    ENROLLMENT_FIELDS.QUERY.ALLOWED_KEYS,
  );

  const rawQueryData = sanitizeFields(
    pickFields(
      query,

      ENROLLMENT_FIELDS.QUERY.ALLOWED_KEYS,
    ),
  );

  const enrollmentQuery = formatEnrollmentQuery(rawQueryData);

  validateEnrollmentFormats(enrollmentQuery);

  return enrollmentQuery;
};

// ===============================
// Params
// ===============================

const getById = (params) => {
  const enrollmentId = formatNumericId(params.id);

  validateId(enrollmentId);

  return enrollmentId;
};

// ===============================
// CRUD
// ===============================

const create = (body) => {
  validateAllowedFields(
    body,

    ENROLLMENT_FIELDS.BODY.CREATE,
  );

  const sanitizedData = sanitizeFields(
    pickFields(
      body,

      ENROLLMENT_FIELDS.BODY.CREATE,
    ),
  );

  validateRequiredFields(
    sanitizedData,

    ENROLLMENT_FIELDS.REQUIRED.CREATE,
  );

  const enrollmentData = formatEnrollmentData(sanitizedData);

  validateEnrollmentFormats(enrollmentData);

  return enrollmentData;
};

const partialUpdate = (params, body) => {
  const enrollmentId = getById(params);

  const sanitizedData = sanitizePatchBody(
    body,

    ENROLLMENT_FIELDS.BODY.UPDATE,
  );

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,

    BadRequestError,

    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const enrollmentData = formatEnrollmentData(sanitizedData);

  validateEnrollmentFormats(enrollmentData);

  return {
    params: enrollmentId,

    body: enrollmentData,
  };
};

// ===============================
// Business Actions
// ===============================

const approve = (params) => {
  return getById(params);
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
