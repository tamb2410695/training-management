const AUTH_FIELDS = {
  BODY: {
    LOGIN: ["usernameOrEmail", "password"],

    CHANGE_PASSWORD: ["currentPassword", "newPassword"],
  },

  REQUIRED: {
    LOGIN: ["usernameOrEmail", "password"],

    CHANGE_PASSWORD: ["currentPassword", "newPassword"],
  },
};

const AUTH_ACTIONS = {
  LOGIN: "LOGIN",

  LOGOUT: "LOGOUT",

  CHANGE_PASSWORD: "CHANGE_PASSWORD",
};

const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid username or password",

  ACCOUNT_LOCKED: "Account has been locked",

  ACCOUNT_DISABLED: "Account has been disabled",

  LOGIN_SUCCESS: "Login successfully",

  LOGOUT_SUCCESS: "Logout successfully",

  PASSWORD_CHANGED: "Password changed successfully",

  ACCESS_DENIED: "Access denied",

  UNAUTHORIZED: "Unauthorized",
};

module.exports = {
  AUTH_FIELDS,

  AUTH_ACTIONS,

  AUTH_MESSAGES,
};
