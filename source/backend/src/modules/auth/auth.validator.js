const { ACCOUNT_STATUS, ERROR_CODES, ERROR_MESSAGES } = require("@/constants");

const { BadRequestError, ForbiddenError } = require("@/utils/errors");

const { throwIf } = require("@/utils/helpers");

// ===============================
// Account
// ===============================

const validateAccountStatus = (account) => {
  throwIf(
    [
      ACCOUNT_STATUS.LOCK,
      ACCOUNT_STATUS.DISABLE,
      ACCOUNT_STATUS.DELETED,
    ].includes(account.accountStatus),

    ForbiddenError,

    ERROR_CODES.ACCESS_DENIED,

    ERROR_MESSAGES.ACCESS_DENIED,
  );
};

// ===============================
// Password
// ===============================

const validatePassword = (password, fieldName = "password") => {
  throwIf(
    !password || password.length < 8,

    BadRequestError,

    `${fieldName} must contain at least 8 characters`,
  );
};

// ===============================
// Login
// ===============================

const validateLogin = (data) => {
  if (!data) return;

  throwIf(
    !data.usernameOrEmail,

    BadRequestError,

    "Username or email is required",
  );

  throwIf(
    !data.password,

    BadRequestError,

    "Password is required",
  );
};

// ===============================
// Change Password
// ===============================

const validateChangePassword = (data) => {
  if (!data) return;

  throwIf(
    !data.currentPassword,

    BadRequestError,

    "Current password is required",
  );

  throwIf(
    !data.newPassword,

    BadRequestError,

    "New password is required",
  );

  validatePassword(data.newPassword, "New password");
};

module.exports = {
  validateAccountStatus,

  validateLogin,

  validateChangePassword,

  validatePassword,
};
