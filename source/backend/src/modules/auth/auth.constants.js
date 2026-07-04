const AUTH_FIELDS = {
  BODY: {
    REGISTER: ["username", "email", "password", "roleCode"],

    LOGIN: ["usernameOrEmail", "password"],

    REFRESH: ["refreshToken"],

    LOGOUT: ["refreshToken"],

    CHANGE_PASSWORD: ["currentPassword", "newPassword"],

    FORGOT_PASSWORD: ["email"],

    RESET_PASSWORD: ["email", "newPassword"],
  },

  REQUIRED: {
    REGISTER: ["username", "email", "password", "roleCode"],

    LOGIN: ["usernameOrEmail", "password"],

    REFRESH: ["refreshToken"],

    LOGOUT: ["refreshToken"],

    CHANGE_PASSWORD: ["currentPassword", "newPassword"],

    FORGOT_PASSWORD: ["email"],

    RESET_PASSWORD: ["email", "newPassword"],
  },
};

const JWT_CONFIG = {
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access_secret_key_2026",

  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh_secret_key_2026",

  ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "15m",

  REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
};

const TOKEN_TYPES = {
  ACCESS: "ACCESS",
  REFRESH: "REFRESH",
  RESET_PASSWORD: "RESET_PASSWORD",
};

const AUTH_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  RESET_PASSWORD: "RESET_PASSWORD",
};

const AUTH_COOKIE = {
  REFRESH_TOKEN: "refreshToken",
};

const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid username or password",
  ACCOUNT_LOCKED: "Account has been locked",
  ACCOUNT_DISABLED: "Account has been disabled",
  LOGIN_SUCCESS: "Login successfully",
  LOGOUT_SUCCESS: "Logout successfully",
  PASSWORD_CHANGED: "Password changed successfully",
  INVALID_REFRESH_TOKEN: "Invalid refresh token",
  ACCESS_DENIED: "Access denied",
  UNAUTHORIZED: "Unauthorized",
};

const AUTH_ROUTES = {
  BASE: "/auth",

  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  REFRESH: "/refresh-token",
  CHANGE_PASSWORD: "/change-password",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  PROFILE: "/me",
};

module.exports = {
  AUTH_FIELDS,
  JWT_CONFIG,
  TOKEN_TYPES,
  AUTH_ACTIONS,
  AUTH_COOKIE,
  AUTH_ROUTES,
};
