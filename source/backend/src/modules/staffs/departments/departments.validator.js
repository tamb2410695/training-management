const { BadRequestError } = require("../../../utils/errors");
const { ERROR_MESSAGES } = require("../../../constants");
const { STAFF_DEPARTMENT_FIELDS } = require("./departments.constants");

const {
  formatNumericId,
} = require("../../../utils/formatters");

const {
  pickFields,
  sanitizeFields,
  hasField,
  throwIf,
} = require("../../../utils/helpers");

const {
  validateId,
  validatePagination,
  validateEnum,
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
} = require("../../../utils/validators");

const validateStaffDepartmentFormats = (assignmentData) => {
  if (!assignmentData) return;

  if (hasField(assignmentData, "page") || hasField(assignmentData, "limit")) {
    validatePagination(assignmentData.page, assignmentData.limit);
  }

  if (hasField(assignmentData, "staffId")) {
    validateId(assignmentData.staffId, "staffId");
  }

  if (hasField(assignmentData, "departmentId")) {
    validateId(assignmentData.departmentId, "departmentId");
  }

  if (hasField(assignmentData, "appointmentType")) {
    validateEnum(
      assignmentData.appointmentType,
      ["PRIMARY", "PART_TIME"],
      "appointmentType"
    );
  }

  if (hasField(assignmentData, "assignedAt")) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dateStr = assignmentData.assignedAt instanceof Date 
      ? assignmentData.assignedAt.toISOString().split('T')[0] 
      : String(assignmentData.assignedAt);

    throwIf(
      !dateRegex.test(dateStr.substring(0, 10)),
      BadRequestError,
      "assignedAt must be a valid date format (YYYY-MM-DD)"
    );
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, STAFF_DEPARTMENT_FIELDS.QUERY.ALLOWED_KEYS);

  const rawQueryData = sanitizeFields(
    pickFields(query, STAFF_DEPARTMENT_FIELDS.QUERY.ALLOWED_KEYS),
  );

  if (rawQueryData.staffId) rawQueryData.staffId = formatNumericId(rawQueryData.staffId);
  if (rawQueryData.departmentId) rawQueryData.departmentId = formatNumericId(rawQueryData.departmentId);

  validateStaffDepartmentFormats(rawQueryData);

  return rawQueryData;
};

const validateCreate = (body) => {
  validateAllowedFields(body, STAFF_DEPARTMENT_FIELDS.BODY.CREATE);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, STAFF_DEPARTMENT_FIELDS.BODY.CREATE),
  );
  
  validateRequiredFields(sanitizedData, STAFF_DEPARTMENT_FIELDS.REQUIRED.CREATE);

  sanitizedData.staffId = formatNumericId(sanitizedData.staffId);
  sanitizedData.departmentId = formatNumericId(sanitizedData.departmentId);

  validateStaffDepartmentFormats(sanitizedData);

  return sanitizedData;
};

const validateUpdate = (params, body) => {
  const staffId = formatNumericId(params.staffId);
  const departmentId = formatNumericId(params.departmentId);
  validateId(staffId, "URL staffId");
  validateId(departmentId, "URL departmentId");

  validateAllowedFields(body, STAFF_DEPARTMENT_FIELDS.BODY.CREATE);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, STAFF_DEPARTMENT_FIELDS.BODY.CREATE),
  );

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateStaffDepartmentFormats(sanitizedData);

  return {
    staffId,
    departmentId,
    staffDepartmentData: sanitizedData,
  };
};

const validatePartialUpdate = (params, body) => {
  const staffId = formatNumericId(params.staffId);
  const departmentId = formatNumericId(params.departmentId);
  validateId(staffId, "URL staffId");
  validateId(departmentId, "URL departmentId");

  validateAllowedFields(body, STAFF_DEPARTMENT_FIELDS.BODY.CREATE);

  const sanitizedData = sanitizePatchBody(body, STAFF_DEPARTMENT_FIELDS.BODY.CREATE);

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateStaffDepartmentFormats(sanitizedData);

  return {
    staffId,
    departmentId,
    staffDepartmentData: sanitizedData,
  };
};

module.exports = {
  validateGetList,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
};