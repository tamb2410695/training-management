import { HTTP_STATUS } from "../../constants";

export const successResponse = (
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
