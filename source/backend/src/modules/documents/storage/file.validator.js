const { BadRequestError } = require("@/utils/errors");

const { ERROR_CODES } = require("@/constants");

const { FILE_LIMITS, ALLOWED_EXTENSIONS } = require("./storage.constants");

const { getExtension, isDocument } = require("./mime.helper");

const validateRequired = (file) => {
  if (!file) {
    throw new BadRequestError(
      ERROR_CODES.FILE_REQUIRED || "FILE_REQUIRED",
      "File is required",
    );
  }
};

const validateSize = (file) => {
  if (file.size > FILE_LIMITS.DOCUMENT) {
    throw new BadRequestError(
      ERROR_CODES.FILE_TOO_LARGE || "FILE_TOO_LARGE",
      "File size exceeds limit",
    );
  }
};

const validateMime = (file) => {
  if (!isDocument(file.mimeType)) {
    console.log(file)
    throw new BadRequestError(
      ERROR_CODES.INVALID_FILE_TYPE || "INVALID_FILE_TYPE",
      "Unsupported mime type",
    );
  }
};

const validateExtension = (file) => {
  const extension = getExtension(file.originalName);

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new BadRequestError(
      ERROR_CODES.INVALID_FILE_EXTENSION || "INVALID_FILE_EXTENSION",
      "Unsupported file extension",
    );
  }
};

const validate = (file) => {
  validateRequired(file);

  validateSize(file);

  validateMime(file);

  validateExtension(file);
};

module.exports = {
  validate,
  validateRequired,
  validateSize,
  validateMime,
  validateExtension,
};
