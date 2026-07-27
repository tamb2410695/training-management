import axios from "axios";
import { storage } from "./storage";
import { HTTP_STATUS } from "../constants";

import {
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  BadRequestError,
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
    const body = response.data;
    return {
      success: body?.success ?? true,
      code: body?.code ?? null,
      message: body?.message ?? null,
      data: body?.data ?? body,
      pagination: body?.pagination ?? null,
    };
  },

  (error) => {
    if (error.response?.data) {

      const body = error.response.data;
      const { error: errorCode, message, errors, statusCode } = body;
      const status = statusCode ?? error.response.status;

      if (status === HTTP_STATUS.UNAUTHORIZED) {
        storage.clearAll();

        return Promise.reject(new UnauthorizedError(errorCode, message));
      }

      switch (status) {
        case HTTP_STATUS.BAD_REQUEST:
          if (errorCode === "VALIDATION_FAILED") {
            return Promise.reject(
              new ValidationError(errorCode, message, errors),
            );
          }

          return Promise.reject(new BadRequestError(errorCode, message));

        case HTTP_STATUS.FORBIDDEN:
          return Promise.reject(new ForbiddenError(errorCode, message));

        case HTTP_STATUS.NOT_FOUND:
          return Promise.reject(new NotFoundError(errorCode, message));

        case HTTP_STATUS.CONFLICT:
          return Promise.reject(new ConflictError(errorCode, message));

        default:
          return Promise.reject(new AppError(errorCode, message, status));
      }
    }
    
    return Promise.reject(
      new AppError(
        "INTERNAL_SERVER_ERROR",
        "Không thể kết nối đến máy chủ",
        500,
      ),
    );
  },
);

export default api;
