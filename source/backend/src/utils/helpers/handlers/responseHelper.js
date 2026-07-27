const { HTTP_STATUS, SUCCESS_MESSAGES } = require("../../../constants/index");

const successResponse = (
  res,
  data = null,
  successCode,
  statusCode = HTTP_STATUS.OK,
  message = SUCCESS_MESSAGES[successCode] || "success",
) => {
  return res.status(statusCode).json({
    success: true,
    successCode,
    message,
    data,
  });
};

module.exports = {
  successResponse,
};
