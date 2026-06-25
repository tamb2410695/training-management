const { AppError } = require("../utils/errors");

const { HTTP_STATUS, ERROR_MESSAGES } = require("../constants");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  });
};

module.exports = errorHandler;
