import { HTTP_STATUS, ERROR_CODES } from "../../constants";
import { translateError } from "./errorTranslator";

export class AppError extends Error {
  constructor(
    errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR,
    message,
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  ) {
    const finalMessage = message ?? translateError(errorCode);

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

export class ValidationError extends AppError {
  constructor(errorCode = ERROR_CODES.VALIDATION_FAILED, message) {
    super(errorCode, message, HTTP_STATUS.BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(errorCode = ERROR_CODES.UNAUTHORIZED, message) {
    super(errorCode, message, HTTP_STATUS.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(errorCode = ERROR_CODES.FORBIDDEN, message) {
    super(errorCode, message, HTTP_STATUS.FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(errorCode = ERROR_CODES.RESOURCE_NOT_FOUND, message) {
    super(errorCode, message, HTTP_STATUS.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(errorCode = ERROR_CODES.CONFLICT, message) {
    super(errorCode, message, HTTP_STATUS.CONFLICT);
  }
}

export class BadRequestError extends AppError {
  constructor(errorCode = ERROR_CODES.BAD_REQUEST, message) {
    super(errorCode, message, HTTP_STATUS.BAD_REQUEST);
  }
}

export const throwError = (
  ErrorClass = AppError,
  errorCode,
  message,
) => {
  throw new ErrorClass(errorCode, message);
};

export const throwIf = (
  condition,
  ErrorClass = AppError,
  errorCode,
  message,
) => {
  if (condition) {
    throw new ErrorClass(errorCode, message);
  }
};

export const ensure = (
  condition,
  errorCode,
  message,
  ErrorClass = ValidationError,
) => {
  if (!condition) {
    throw new ErrorClass(errorCode, message);
  }
};