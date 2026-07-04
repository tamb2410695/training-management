import axios from "axios";
import { storage } from "./storage";
import { HTTP_STATUS } from "../constants/system/httpStatus";
import {
  translateError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  BadRequestError,
  AppError,
} from "../utils/errors";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return {
      data: response.data?.data ?? response.data,
      pagination: response.data?.pagination || null,
      success: response.data?.success ?? true,
    };
  },
  (error) => {
    if (error.response && error.response.data) {
      const {
        message: enMessage,
        error: errCode,
        statusCode,
      } = error.response.data;

      const viMessage = translateError(errCode, enMessage);

      if (
        statusCode === HTTP_STATUS.UNAUTHORIZED ||
        error.response.status === 401
      ) {
        storage.clearAll();
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(new UnauthorizedError(viMessage, errCode));
      }

      switch (statusCode) {
        case HTTP_STATUS.BAD_REQUEST:
          if (errCode === "VALIDATION_FAILED") {
            return Promise.reject(new ValidationError(viMessage, errCode));
          }
          return Promise.reject(new BadRequestError(viMessage, errCode));

        case HTTP_STATUS.FORBIDDEN:
          return Promise.reject(new ForbiddenError(viMessage, errCode));

        case HTTP_STATUS.NOT_FOUND:
          return Promise.reject(new NotFoundError(viMessage, errCode));

        case HTTP_STATUS.CONFLICT:
          return Promise.reject(new ConflictError(viMessage, errCode));

        default:
          return Promise.reject(new AppError(viMessage, statusCode, errCode));
      }
    }

    return Promise.reject(
      new AppError(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền mạng.",
        500,
      ),
    );
  },
);

export default api;
