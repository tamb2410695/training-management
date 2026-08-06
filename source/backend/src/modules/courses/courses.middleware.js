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

const { COURSE_FIELDS } = require("./courses.constants");

const { validateCourseFormats } = require("./courses.validator");

const { formatCourseData, formatCourseQuery } = require("./courses.formatter");

// ===============================
// Query
// ===============================

const getList = (query) => {
  validateAllowedFields(query, COURSE_FIELDS.QUERY.ALLOWED_KEYS);

  const rawQueryData = sanitizeFields(
    pickFields(query, COURSE_FIELDS.QUERY.ALLOWED_KEYS),
  );

  const courseQuery = formatCourseQuery(rawQueryData);

  validateCourseFormats(courseQuery);

  return courseQuery;
};

// ===============================
// Params
// ===============================

const getById = (params) => {
  const courseId = formatNumericId(params.id);

  validateId(courseId);

  return courseId;
};

// ===============================
// CRUD
// ===============================

const create = (body) => {
  validateAllowedFields(body, COURSE_FIELDS.BODY.CREATE);

  const sanitizedData = sanitizeFields(
    pickFields(body, COURSE_FIELDS.BODY.CREATE),
  );

  validateRequiredFields(sanitizedData, COURSE_FIELDS.REQUIRED.CREATE);

  const courseData = formatCourseData(sanitizedData);

  validateCourseFormats(courseData);

  return courseData;
};

const partialUpdate = (params, body) => {
  const courseId = getById(params);

  const sanitizedData = sanitizePatchBody(body, COURSE_FIELDS.BODY.UPDATE);

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,

    BadRequestError,

    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const courseData = formatCourseData(sanitizedData);

  validateCourseFormats(courseData);

  return {
    params: courseId,
    body: courseData,
  };
};

// ===============================
// Business Actions
// ===============================

const publish = (params) => {
  return getById(params);
};

const archive = (params) => {
  return getById(params);
};

module.exports = {
  getList,

  getById,

  create,

  partialUpdate,

  publish,

  archive,
};
