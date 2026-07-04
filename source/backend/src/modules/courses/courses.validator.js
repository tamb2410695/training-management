const AppError = require("../../utils/errors");
const { COURSE_LEVEL, COURSE_STATUS, ERROR_MESSAGES } = require("../../constants");
const { COURSE_FIELDS } = require("./courses.constants");

const {
  formatCourseData,
  formatCourseQuery,
  formatNumericId,
} = require("../../utils/formatters");

const { pickFields, sanitizeFields, hasField, throwIf } = require("../../utils/helpers");

const {
  validateEnum,
  validateId,
  validatePagination,
  validateAllowedFields,
  validateRequiredFields,
} = require("../../utils/validators");

const validateCourseFormats = (courseData) => {
  if (!courseData) return;

  if (hasField(courseData, "courseLevel")) {
    validateEnum(courseData.courseLevel, Object.values(COURSE_LEVEL), "courseLevel");
  }

  if (hasField(courseData, "courseStatus")) {
    validateEnum(courseData.courseStatus, Object.values(COURSE_STATUS), "courseStatus");
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, COURSE_FIELDS.QUERY.ALLOWED_KEYS);

  const rawQueryData = sanitizeFields(
    pickFields(query, COURSE_FIELDS.QUERY.ALLOWED_KEYS)
  );
  const queryData = formatCourseQuery(rawQueryData);

  if (hasField(queryData, "page") || hasField(queryData, "limit")) {
    validatePagination(queryData.page, queryData.limit);
  }

  if (hasField(queryData, "courseLevel")) {
    validateEnum(queryData.courseLevel, Object.values(COURSE_LEVEL), "courseLevel");
  }

  if (hasField(queryData, "courseStatus")) {
    validateEnum(queryData.courseStatus, Object.values(COURSE_STATUS), "courseStatus");
  }

  return queryData;
};

const validateGetById = (params) => {
  const courseId = formatNumericId(params.id);
  validateId(courseId);
  return courseId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, COURSE_FIELDS.BODY.CREATE);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, COURSE_FIELDS.BODY.CREATE)
  );
  
  validateRequiredFields(sanitizedData, COURSE_FIELDS.REQUIRED.CREATE);

  const courseData = formatCourseData(sanitizedData);
  validateCourseFormats(courseData);

  return courseData;
};

const validateUpdate = (params, body) => {
  const courseId = formatNumericId(params.id);
  validateId(courseId);

  validateAllowedFields(body, COURSE_FIELDS.BODY.UPDATE);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, COURSE_FIELDS.BODY.UPDATE)
  );

  const courseData = formatCourseData(sanitizedData);

  throwIf(
    !courseData || Object.keys(courseData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS
  );

  validateCourseFormats(courseData);

  return {
    courseId,
    courseData,
  };
};

const validatePartialUpdate = (params, body) => {
  const courseId = formatNumericId(params.id);
  validateId(courseId);

  validateAllowedFields(body, COURSE_FIELDS.BODY.UPDATE);

  const sanitizedData = sanitizeFields(
    pickFields(body, COURSE_FIELDS.BODY.UPDATE)
  );

  const courseData = formatCourseData(sanitizedData);

  throwIf(
    !courseData || Object.keys(courseData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS
  );

  validateCourseFormats(courseData);

  return {
    courseId,
    courseData,
  };
};

const validateRemove = (params) => {
  const courseId = formatNumericId(params.id);
  validateId(courseId);
  return courseId;
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
};