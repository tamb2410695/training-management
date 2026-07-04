const { BadRequestError } = require("../../../utils/errors");
const { STAFF_CAPABILITY_FIELDS } = require("./capabilities.constants");
const { formatNumericId } = require("../../../utils/formatters");
const { pickFields, sanitizeFields, hasField } = require("../../../utils/helpers");
const {
  validateId,
  validatePagination,
  validateAllowedFields,
  validateRequiredFields,
} = require("../../../utils/validators");

/**
 * Kiểm tra định dạng cơ bản của cặp ID liên kết ngoại lai
 */
const validateCapabilityFormats = (data) => {
  if (!data) return;

  if (hasField(data, "page") || hasField(data, "limit")) {
    validatePagination(data.page, data.limit);
  }

  if (hasField(data, "staffId")) {
    validateId(data.staffId, "staffId");
  }

  if (hasField(data, "courseId")) {
    validateId(data.courseId, "courseId");
  }
};

/**
 * Validate Query params khi lấy danh sách
 */
const validateGetList = (query) => {
  validateAllowedFields(query, STAFF_CAPABILITY_FIELDS.QUERY.ALLOWED_KEYS);

  const rawQueryData = sanitizeFields(
    pickFields(query, STAFF_CAPABILITY_FIELDS.QUERY.ALLOWED_KEYS),
  );

  if (rawQueryData.staffId) rawQueryData.staffId = formatNumericId(rawQueryData.staffId);
  if (rawQueryData.courseId) rawQueryData.courseId = formatNumericId(rawQueryData.courseId);

  validateCapabilityFormats(rawQueryData);
  return rawQueryData;
};

/**
 * Validate Body data khi gán năng lực mới (POST)
 */
const validateCreate = (body) => {
  validateAllowedFields(body, STAFF_CAPABILITY_FIELDS.BODY.CREATE);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, STAFF_CAPABILITY_FIELDS.BODY.CREATE),
  );
  
  validateRequiredFields(sanitizedData, STAFF_CAPABILITY_FIELDS.REQUIRED.CREATE);

  sanitizedData.staffId = formatNumericId(sanitizedData.staffId);
  sanitizedData.courseId = formatNumericId(sanitizedData.courseId);

  validateCapabilityFormats(sanitizedData);
  return sanitizedData;
};

module.exports = {
  validateGetList,
  validateCreate,
};