import { AppError, ValidationError } from "./AppError";

import { ERROR_CODES, ERROR_MESSAGES_VI } from "@/constants";

export function errorHandler(error) {
  if (error instanceof ValidationError) {
    return {
      errorCode: error.errorCode,
      statusCode: error.statusCode,
      fieldErrors: error.fieldErrors ?? {},
      message: error.message,
      serverError: {},
    };
  }

  if (error instanceof AppError) {
    return {
      errorCode: error.errorCode,
      statusCode: error.statusCode,
      fieldErrors: {},
      message: error.message,
      serverError: null,
    };
  }

  if (error?.response) {
    const response = error.response.data;

    return {
      errorCode: response?.error ?? ERROR_CODES.INTERNAL_SERVER_ERROR,
      statusCode: response?.statusCode ?? error.response.status,
      fieldErrors: response?.errors ?? {},
      message: response?.message ?? ERROR_MESSAGES_VI.INTERNAL_SERVER_ERROR,
      serverError: {},
    };
  }

  if (error instanceof Error) {
    return {
      errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      fieldErrors: {},
      message: error.message,
      serverError: {},
    };
  }

  return {
    errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
    statusCode: 500,
    fieldErrors: {},
    message: ERROR_MESSAGES_VI.INTERNAL_SERVER_ERROR,
    serverError: true,
  };
}
