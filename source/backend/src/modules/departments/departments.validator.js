const { BadRequestError } = require("../../utils/errors");
const { ERROR_MESSAGES, ERROR_CODES } = require("../../constants");
const { DEPARTMENT_FIELDS } = require("./departments.constants");

const {
  formatNumericId,
} = require("../../utils/formatters");

const {
  pickFields,
  sanitizeFields,
  hasField,
  throwIf,
} = require("../../utils/helpers");

const {
  validateId,
  validatePagination,
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
} = require("../../utils/validators");
const { formatDepartmentQuery } = require("../../utils/formatters");

const validateDepartmentFormats = (departmentData) => {
  if (!departmentData) return;

  if (hasField(departmentData, "page") || hasField(departmentData, "limit")) {
    validatePagination(departmentData.page, departmentData.limit);
  }

  if (hasField(departmentData, "departmentCode")) {
    const code = departmentData.departmentCode;
    throwIf(
      typeof code !== "string" || code.length === 0,
      BadRequestError,
      "Department code must be a non-empty string"
    );
    throwIf(
      code.length > 25,
      BadRequestError,
      "Department code cannot exceed 25 characters"
    );
  }

  if (hasField(departmentData, "departmentName")) {
    const name = departmentData.departmentName;
    throwIf(
      typeof name !== "string" || name.length === 0,
      BadRequestError,
      "Department name must be a non-empty string"
    );
    throwIf(
      name.length > 100,
      BadRequestError,
      "Department name cannot exceed 100 characters"
    );
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, DEPARTMENT_FIELDS.QUERY.ALLOWED_KEYS);

  const rawQueryData = sanitizeFields(
    pickFields(query, DEPARTMENT_FIELDS.QUERY.ALLOWED_KEYS),
  );
  const queryData = formatDepartmentQuery(rawQueryData);
  validateDepartmentFormats(queryData);

  return queryData;
};

const validateGetById = (params) => {
  const departmentId = formatNumericId(params.id);
  validateId(departmentId);
  return departmentId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, DEPARTMENT_FIELDS.BODY.CREATE);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, DEPARTMENT_FIELDS.BODY.CREATE),
  );
  
  validateRequiredFields(sanitizedData, DEPARTMENT_FIELDS.REQUIRED.CREATE);
  validateDepartmentFormats(sanitizedData);

  return sanitizedData;
};

const validateUpdate = (params, body) => {
  const departmentId = formatNumericId(params.id);
  validateId(departmentId);

  validateAllowedFields(body, DEPARTMENT_FIELDS.BODY.UPDATE);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, DEPARTMENT_FIELDS.BODY.UPDATE),
  );
  
  validateRequiredFields(sanitizedData, DEPARTMENT_FIELDS.REQUIRED.UPDATE);

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const departmentData = formatDepartmentQuery(sanitizedData);
  validateDepartmentFormats(departmentData);

  return {
    departmentId,
    departmentData,
  };
};

const validatePartialUpdate = (params, body) => {
  const departmentId = formatNumericId(params.id);
  validateId(departmentId);

  validateAllowedFields(body, DEPARTMENT_FIELDS.BODY.UPDATE);

  const sanitizedData = sanitizePatchBody(body, DEPARTMENT_FIELDS.BODY.UPDATE);

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const departmentData = formatDepartmentQuery(sanitizedData);
  validateDepartmentFormats(departmentData);

  return {
    departmentId,
    departmentData,
  };
};

const validateRemove = (params) => {
  const departmentId = formatNumericId(params.id);
  validateId(departmentId);
  return departmentId;
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
};