const { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } = require("../../constants");

class AppError extends Error {
  constructor(
    errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR,
    customMessage = null,
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  ) {
    const finalMessage =
      customMessage ||
      ERROR_MESSAGES[errorCode] ||
      "An unexpected error occurred";

    super(finalMessage);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ValidationError extends AppError {
  constructor(errorCode = ERROR_CODES.VALIDATION_FAILED, customMessage = null) {
    super(errorCode, customMessage, HTTP_STATUS.BAD_REQUEST);
  }
}

class BadRequestError extends AppError {
  constructor(errorCode = ERROR_CODES.BAD_REQUEST, customMessage = null) {
    super(errorCode, customMessage, HTTP_STATUS.BAD_REQUEST);
  }
}

class UnauthorizedError extends AppError {
  constructor(errorCode = ERROR_CODES.UNAUTHORIZED, customMessage = null) {
    super(errorCode, customMessage, HTTP_STATUS.UNAUTHORIZED);
  }
}

class ForbiddenError extends AppError {
  constructor(errorCode = ERROR_CODES.FORBIDDEN, customMessage = null) {
    super(errorCode, customMessage, HTTP_STATUS.FORBIDDEN);
  }
}

class NotFoundError extends AppError {
  constructor(errorCode = ERROR_CODES.NOT_FOUND, customMessage = null) {
    super(errorCode, customMessage, HTTP_STATUS.NOT_FOUND);
  }
}

class ConflictError extends AppError {
  constructor(errorCode = ERROR_CODES.CONFLICT, customMessage = null) {
    super(errorCode, customMessage, HTTP_STATUS.CONFLICT);
  }
}

module.exports = {
  AppError,
  ValidationError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};