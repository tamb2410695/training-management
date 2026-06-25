const AppError = require("../../utils/errors");
const {
  ERROR_MESSAGES,
  COURSE_STATUS,
  COURSE_LEVELS,
} = require("../../constants");
const { COURSE_FIELDS } = require("./courses.constants");
const {
  formatCourseData,
  formatCourseQuery,
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

const validateCourseFormats = (courseData) => {

  if (hasField(courseData, "level")) {
    validateEnum(courseData.level, Object.values(COURSE_LEVELS), "level");
  }

  if (hasField(courseData, "courseStatus")) {
    validateEnum(
      courseData.courseStatus,
      Object.values(COURSE_STATUS),
      "courseStatus",
    );
  }

  if (hasField(courseData, "certificateAvailable")) {
    const certAvail = String(courseData.certificateAvailable).toUpperCase();
    throwIf(
      certAvail !== "TRUE" &&
        certAvail !== "FALSE" &&
        typeof courseData.certificateAvailable !== "boolean",
      AppError.BadRequestError,
      "certificateAvailable must be a boolean (true/false)",
    );
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, COURSE_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(
    pickFields(query, COURSE_FIELDS.QUERY.ALLOWED_KEYS),
  );
  const queryData = formatCourseQuery(rawQueryData);

  if (hasField(queryData, "page") || hasField(queryData, "limit")) {
    validatePagination(queryData.page, queryData.limit);
  }

  if (hasField(queryData, "courseStatus")) {
    validateEnum(
      queryData.courseStatus,
      Object.values(COURSE_STATUS),
      "courseStatus",
    );
  }

  if (hasField(queryData, "level")) {
    validateEnum(queryData.level, Object.values(COURSE_LEVELS), "level");
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
  const raw = sanitizeFields(pickFields(body, COURSE_FIELDS.BODY.CREATE));
  validateRequiredFields(raw, COURSE_FIELDS.REQUIRED.CREATE);

  const courseData = formatCourseData(raw);
  validateCourseFormats(courseData);
  return { courseData };
};

const validateUpdate = (params, body) => {
  const courseId = formatNumericId(params.id);
  validateId(courseId);

  validateAllowedFields(body, COURSE_FIELDS.BODY.UPDATE);

  const rawCourseData = sanitizeFields(
    pickFields(body, COURSE_FIELDS.BODY.UPDATE),
  );
  validateRequiredFields(rawCourseData, COURSE_FIELDS.REQUIRED.UPDATE);

  const courseData = formatCourseData(rawCourseData);

  throwIf(
    !courseData || Object.keys(courseData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
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
  const raw = sanitizeFields(pickFields(body, COURSE_FIELDS.BODY.UPDATE));
  const courseData = formatCourseData(raw);

  throwIf(
    !courseData || Object.keys(courseData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );
  validateCourseFormats(courseData);
  return { courseId, courseData };
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
