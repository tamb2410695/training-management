const { HTTP_STATUS } = require("../../../constants/index");

const successResponse = (
  res,
  data,
  message = "Success",
  statusCode = HTTP_STATUS.OK,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

module.exports = {
  successResponse,
};
