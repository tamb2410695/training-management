const { BadRequestError, ForbiddenError } = require("@/utils/errors");

const { ERROR_CODES } = require("@/constants");

const { DOCUMENT_FIELDS, DOCUMENT_ENUMS } = require("./documents.constants");

const { formatNumericId } = require("@/utils/formatters");

const { hasField, throwIf } = require("@/utils/helpers");

const {
  validateEnum,
  validateId,
  validatePagination,
  queryValidator,
} = require("@/utils/validators");

// ===============================
// Format Validation
// ===============================

const validateDocumentFormats = (data) => {
  if (!data) return;

  console.log(data)
  queryValidator(
    data,
    DOCUMENT_FIELDS.QUERY.SEARCHABLE,
    DOCUMENT_FIELDS.QUERY.SORTABLE,
  );

  if (hasField(data, "page") || hasField(data, "limit")) {
    validatePagination(data.page, data.limit);
  }

  if (hasField(data, "courseId")) {
    const courseId = formatNumericId(data.courseId);

    validateId(courseId, "courseId");
  }

  if (hasField(data, "uploadedBy")) {
    const uploadedBy = formatNumericId(data.uploadedBy);

    validateId(uploadedBy, "uploadedBy");
  }

  if (hasField(data, "documentStatus")) {
    validateEnum(
      data.documentStatus,
      Object.values(DOCUMENT_ENUMS.STATUS),
      "documentStatus",
    );
  }

  if (hasField(data, "isVisible")) {
    const value = data.isVisible;

    const isValidBoolean =
      value === true ||
      value === false ||
      value === "true" ||
      value === "false";

    throwIf(
      !isValidBoolean,
      BadRequestError,
      "isVisible must be a boolean value",
    );
  }
};

// ===============================
// Resource Permission
// ===============================

const validateDocumentOwner = (document, staffId) => {
  throwIf(
    Number(document.uploadedBy) !== Number(staffId),

    ForbiddenError,

    ERROR_CODES.FORBIDDEN || "DOCUMENT_ACCESS_DENIED",
  );
};

module.exports = {
  validateDocumentFormats,
  validateDocumentOwner,
};
