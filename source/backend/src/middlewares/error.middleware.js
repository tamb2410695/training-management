const { AppError } = require("@/utils/errors");
const {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
} = require("@/constants");

const errorHandler = (err, req, res, next) => {
  console.error(err);
  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
  let message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR || "Internal server error";

  if (err instanceof AppError || err.isOperational || err.errorCode) {
    statusCode = err.statusCode || HTTP_STATUS.BAD_REQUEST;
    errorCode = err.errorCode;
    message = err.message;
  } 
  else if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    errorCode = ERROR_CODES.INVALID_FIELDS;
    message = "Invalid JSON payload format";
  }

  const errorResponse = {
    success: false,
    error: {
      code: errorCode,
      message: message,
      path: req.originalUrl,
    },
  };

  return res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;