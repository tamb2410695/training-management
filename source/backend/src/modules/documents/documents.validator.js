const { BadRequestError } = require("../../utils/errors");
const { ERROR_MESSAGES } = require("../../constants");
const { DOCUMENT_FIELDS } = require("./documents.constants");

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
  validateEnum,
  validateId,
  validatePagination,
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
} = require("../../utils/validators");

const DOCUMENT_ENUMS = {
  LEVEL: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
  STATUS: ["AVAILABLE", "ARCHIVED", "DELETED"],
  CATEGORY: ["GENERAL", "SLIDE", "EXAM", "ASSIGNMENT", "REFERENCE"]
};

const validateDocumentFormats = (documentData) => {
  if (!documentData) return;

  if (hasField(documentData, "page") || hasField(documentData, "limit")) {
    validatePagination(documentData.page, documentData.limit);
  }

  if (hasField(documentData, "courseId")) {
    const courseId = formatNumericId(documentData.courseId);
    validateId(courseId);
  }

  if (hasField(documentData, "category")) {
    validateEnum(
      documentData.category,
      DOCUMENT_ENUMS.CATEGORY,
      "category"
    );
  }

  if (hasField(documentData, "documentStatus")) {
    validateEnum(
      documentData.documentStatus,
      DOCUMENT_ENUMS.STATUS,
      "documentStatus"
    );
  }

  if (hasField(documentData, "isVisible")) {
    const val = documentData.isVisible;
    const isValidBoolean = val === true || val === false || val === "true" || val === "false";
    
    throwIf(
      !isValidBoolean,
      BadRequestError,
      "isVisible must be a boolean value (true or false)"
    );
  }
};

const validateGetDocuments = (query) => {
  validateAllowedFields(query, DOCUMENT_FIELDS.QUERY.ALLOWED_KEYS);

  const queryData = sanitizeFields(
    pickFields(query, DOCUMENT_FIELDS.QUERY.ALLOWED_KEYS),
  );

  validateDocumentFormats(queryData);

  return queryData;
};

const validateDocumentId = (params) => {
  throwIf(
    !params || !params.id,
    BadRequestError,
    "Document ID is required"
  );

  const documentId = formatNumericId(params.id);
  validateId(documentId);
  return documentId;
};

const validateUpload = (body, file) => {
  throwIf(
    !file,
    BadRequestError,
    "Uploaded file is required"
  );

  validateAllowedFields(body, DOCUMENT_FIELDS.BODY.CREATE);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, DOCUMENT_FIELDS.BODY.CREATE),
  );
  
  validateRequiredFields(sanitizedData, DOCUMENT_FIELDS.REQUIRED.CREATE);
  validateDocumentFormats(sanitizedData);

  if (sanitizedData.courseId) {
    sanitizedData.courseId = formatNumericId(sanitizedData.courseId);
  }

  return sanitizedData;
};

const validateUpdate = (params, body) => {
  const documentId = validateDocumentId(params);

  validateAllowedFields(body, DOCUMENT_FIELDS.BODY.UPDATE);
  
  const sanitizedData = sanitizePatchBody(body, DOCUMENT_FIELDS.BODY.UPDATE);

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateDocumentFormats(sanitizedData);

  return {
    documentId,
    documentData: sanitizedData,
  };
};

const validateDelete = (params) => {
  return validateDocumentId(params);
};

module.exports = {
  validateGetDocuments,
  validateDocumentId,
  validateUpload,
  validateUpdate,
  validateDelete,
};