const AppError = require("../../utils/errors");
const { ERROR_MESSAGES, CLASS_STATUS } = require("../../constants");
const { CLASS_FIELDS } = require("./classes.constants");
const {
  formatClassData,
  formatClassQuery,
  formatId,
  formatNumericId,
  formatLimit,
  normalizeEnum,
  formatKeyword,
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

const validateClassFormats = (classData) => {
  if (hasField(classData, "courseId")) validateId(classData.courseId);
  if (hasField(classData, "instructorId")) validateId(classData.instructorId);
  if (hasField(classData, "classStatus")) {
    validateEnum(
      classData.classStatus,
      Object.values(CLASS_STATUS),
      "classStatus"
    );
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, CLASS_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(
    pickFields(query, CLASS_FIELDS.QUERY.ALLOWED_KEYS)
  );
  const queryData = formatClassQuery(rawQueryData);

  if (hasField(queryData, "page") || hasField(queryData, "limit")) {
    validatePagination(queryData.page, queryData.limit);
  }

  if (hasField(queryData, "classStatus")) {
    validateEnum(
      queryData.classStatus,
      Object.values(CLASS_STATUS),
      "classStatus"
    );
  }

  if (hasField(queryData, "courseId")) validateId(formatNumericId(queryData.courseId));
  if (hasField(queryData, "instructorId")) validateId(formatNumericId(queryData.instructorId));

  return queryData;
};

const validateGetById = (params) => {
  const classId = formatNumericId(params.id);
  validateId(classId);
  return classId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, CLASS_FIELDS.BODY.CREATE);

  const rawClassData = sanitizeFields(
    pickFields(body, CLASS_FIELDS.BODY.CREATE)
  );
  validateRequiredFields(rawClassData, CLASS_FIELDS.REQUIRED.CREATE);

  const classData = formatClassData(rawClassData);

  validateClassFormats(classData);

  return {
    classData,
  };
};

const validateUpdate = (params, body) => {
  const classId = formatNumericId(params.id);
  validateId(classId);

  validateAllowedFields(body, CLASS_FIELDS.BODY.UPDATE);

  const rawClassData = sanitizeFields(
    pickFields(body, CLASS_FIELDS.BODY.UPDATE)
  );
  validateRequiredFields(rawClassData, CLASS_FIELDS.REQUIRED.UPDATE);

  const classData = formatClassData(rawClassData);

  throwIf(
    !classData || Object.keys(classData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS
  );

  validateClassFormats(classData);

  return {
    classId,
    classData,
  };
};

const validatePartialUpdate = (params, body) => {
  const classId = formatNumericId(params.id);
  validateId(classId);

  validateAllowedFields(body, CLASS_FIELDS.BODY.UPDATE);

  const rawClassData = sanitizeFields(
    pickFields(body, CLASS_FIELDS.BODY.UPDATE)
  );

  const classData = formatClassData(rawClassData);

  throwIf(
    !classData || Object.keys(classData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS
  );

  validateClassFormats(classData);

  return {
    classId,
    classData,
  };
};

const validateRemove = (params) => {
  const classId = formatNumericId(params.id);
  validateId(classId);
  return classId;
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
};