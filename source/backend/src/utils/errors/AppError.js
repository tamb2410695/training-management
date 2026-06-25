const { HTTP_STATUS, ERROR_MESSAGES } = require("../../constants/index");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

class ForbiddenError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

class ConflictError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

module.exports = {
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
  ConflictError
};
