const AppError = require("../../utils/errors");
const {
  ERROR_MESSAGES,
  ENROLLMENT_STATUS,
  COURSE_LEVELS,
} = require("../../constants");
const { ENROLLMENT_FIELDS } = require("./enrollments.constants");
const {
  formatEnrollmentData,
  formatEnrollmentQuery,
  formatId,
  formatNumericId,
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
  validateAllowedFields,
  validateRequiredFields,
} = require("../../utils/validators");

const validateEnrollmentFormats = (enrollmentData) => {
  if (hasField(enrollmentData, "enrollmentStatus")) {
    validateEnum(
      enrollmentData.enrollmentStatus,
      Object.values(ENROLLMENT_STATUS),
      "enrollmentStatus",
    );
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, ENROLLMENT_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(
    pickFields(query, ENROLLMENT_FIELDS.QUERY.ALLOWED_KEYS),
  );
  const queryData = formatEnrollmentQuery(rawQueryData);

  if (hasField(queryData, "page") || hasField(queryData, "limit")) {
    validatePagination(queryData.page, queryData.limit);
  }

  validateEnrollmentFormats(queryData)

  return queryData;
};

const validateGetById = (params) => {
  const enrollmentId = formatNumericId(params.id);
  validateId(enrollmentId);
  return enrollmentId;
};

const validateCreate = (body) => {
  console.log(body)
  validateAllowedFields(body, ENROLLMENT_FIELDS.BODY.CREATE);
  const raw = sanitizeFields(pickFields(body, ENROLLMENT_FIELDS.BODY.CREATE));
  validateRequiredFields(raw, ENROLLMENT_FIELDS.REQUIRED.CREATE);

  const enrollmentData = formatEnrollmentData(raw);
  console.log(enrollmentData)
  validateEnrollmentFormats(enrollmentData);
  return { ...enrollmentData };
};

const validateUpdate = (params, body) => {
  const enrollmentId = formatNumericId(params.id);
  validateId(enrollmentId);

  validateAllowedFields(body, ENROLLMENT_FIELDS.BODY.UPDATE);

  const rawEnrollmentData = sanitizeFields(
    pickFields(body, ENROLLMENT_FIELDS.BODY.UPDATE),
  );
  validateRequiredFields(rawEnrollmentData, ENROLLMENT_FIELDS.REQUIRED.UPDATE);

  const enrollmentData = formatEnrollmentData(rawEnrollmentData);

  throwIf(
    !enrollmentData || Object.keys(enrollmentData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateEnrollmentFormats(enrollmentData);

  return {
    enrollmentId,
    enrollmentData,
  };
};

const validatePartialUpdate = (params, body) => {
  const enrollmentId = formatNumericId(params.id);
  validateId(enrollmentId);

  validateAllowedFields(body, ENROLLMENT_FIELDS.BODY.UPDATE);
  const raw = sanitizeFields(pickFields(body, ENROLLMENT_FIELDS.BODY.UPDATE));
  const enrollmentData = formatEnrollmentData(raw);

  throwIf(
    !enrollmentData || Object.keys(enrollmentData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );
  validateEnrollmentFormats(enrollmentData);
  return { enrollmentId, enrollmentData };
};

const validateRemove = (params) => {
  const enrollmentId = formatNumericId(params.id);
  validateId(enrollmentId);
  return enrollmentId;
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
};
