import { HTTP_STATUS } from "../../constants";
import { ERROR_CODES } from "./errorCodes";

export class AppError extends Error {
  constructor(
    message,
    statusCode,
    errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ValidationError extends AppError {
  constructor(message, errorCode = ERROR_CODES.VALIDATION_FAILED) {
    super(message, HTTP_STATUS.BAD_REQUEST, errorCode);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message, errorCode = ERROR_CODES.UNAUTHORIZED) {
    super(message, HTTP_STATUS.UNAUTHORIZED, errorCode);
  }
}

export class ForbiddenError extends AppError {
  constructor(message, errorCode = ERROR_CODES.FORBIDDEN) {
    super(message, HTTP_STATUS.FORBIDDEN, errorCode);
  }
}

export class NotFoundError extends AppError {
  constructor(message, errorCode = ERROR_CODES.RESOURCE_NOT_FOUND) {
    super(message, HTTP_STATUS.NOT_FOUND, errorCode);
  }
}

export class BadRequestError extends AppError {
  constructor(message, errorCode = ERROR_CODES.BAD_REQUEST) {
    super(message, HTTP_STATUS.BAD_REQUEST, errorCode);
  }
}

export class ConflictError extends AppError {
  constructor(message, errorCode = ERROR_CODES.CONFLICT) {
    super(message, HTTP_STATUS.CONFLICT, errorCode);
  }
}

export const throwIf = (condition, ErrorClass, ...args) => {
  if (condition) throw new ErrorClass(...args);
};

export const ensure = (condition, message, ErrorClass = ValidationError, errorCode) => {
  if (!condition) throw new ErrorClass(message, errorCode);
};