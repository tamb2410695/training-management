const AUTH_FIELDS = {
  BODY: {
    REGISTER: ["username", "email", "password", "roleName"],
    LOGIN: ["usernameOrEmail", "password"],
    REFRESH: ["refreshToken"],
    CHANGE_PASSWORD: ["currentPassword", "newPassword"],
    RESET_PASSWORD: ["email", "newPassword"],
  }
};

const JWT_CONFIG = {
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access_secret_key_2026",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh_secret_key_2026",
  ACCESS_EXPIRES: "15m",
  REFRESH_EXPIRES: "7d",
};

module.exports = {
  AUTH_FIELDS,
  JWT_CONFIG,
};