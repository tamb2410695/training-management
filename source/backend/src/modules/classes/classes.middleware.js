const {
  validateAllowedFields,
} = require("@/utils/validators/request/requestFields.validator");

const {
  validateRequiredFields,
} = require("@/utils/validators/request/requiredFields.validator");

const {
  sanitizePatchBody,
} = require("@/utils/validators/request/patch.validator");

const {
  sanitizeFields,

  pickFields,

  throwIf,
} = require("@/utils/helpers");

const { formatNumericId } = require("@/utils/formatters/input/paramsFormatter");

const { validateId } = require("@/utils/validators/common/id.validator");

const { BadRequestError } = require("@/utils/errors");

const { ERROR_MESSAGES } = require("@/constants");

const { CLASS_FIELDS } = require("./classes.constants");

const { validateClassFormats } = require("./classes.validator");

const {
  formatClassData,

  formatClassQuery,
} = require("./classes.formatter");

// ===============================
// Query
// ===============================

const getList = (query) => {
  validateAllowedFields(
    query,

    CLASS_FIELDS.QUERY.ALLOWED_KEYS,
  );

  const rawQueryData = sanitizeFields(
    pickFields(
      query,

      CLASS_FIELDS.QUERY.ALLOWED_KEYS,
    ),
  );

  const classQuery = formatClassQuery(rawQueryData);

  validateClassFormats(classQuery);

  return classQuery;
};

// ===============================
// Params
// ===============================

const getById = (params) => {
  const classId = formatNumericId(params.id);

  validateId(classId);

  return classId;
};

// ===============================
// CRUD
// ===============================

const create = (body) => {
  validateAllowedFields(
    body,

    CLASS_FIELDS.BODY.CREATE,
  );

  const sanitizedData = sanitizeFields(
    pickFields(
      body,

      CLASS_FIELDS.BODY.CREATE,
    ),
  );

  validateRequiredFields(
    sanitizedData,

    CLASS_FIELDS.REQUIRED.CREATE,
  );

  const classData = formatClassData(sanitizedData);

  validateClassFormats(classData);

  return classData;
};

const partialUpdate = (
  params,

  body,
) => {
  const classId = getById(params);

  const sanitizedData = sanitizePatchBody(
    body,

    CLASS_FIELDS.BODY.UPDATE,
  );

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,

    BadRequestError,

    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const classData = formatClassData(sanitizedData);

  validateClassFormats(classData);

  return {
    params: classId,

    body: classData,
  };
};

// ===============================
// Business Actions
// ===============================

const assignInstructor = (
  params,

  body,
) => {
  const classId = getById(params);

  validateAllowedFields(
    body,

    ["teacherId"],
  );

  const sanitizedData = sanitizeFields(
    pickFields(
      body,

      ["teacherId"],
    ),
  );

  const formattedData = formatClassData(sanitizedData);

  validateClassFormats(formattedData);

  return {
    params: classId,

    body: formattedData,
  };
};

const open = (params) => {
  return getById(params);
};

const start = (params) => {
  return getById(params);
};

const complete = (params) => {
  return getById(params);
};

const cancel = (params) => {
  return getById(params);
};

// ===============================
// Support
// ===============================

const getCapacity = (params) => {
  return getById(params);
};

module.exports = {
  getList,
  getById,
  create,
  partialUpdate,
  assignInstructor,
  open,
  start,
  complete,
  cancel,
  getCapacity,
};
