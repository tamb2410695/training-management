const db = require("@/config/database");

const AppError = require("@/utils/errors");

const { throwIf } = require("@/utils/helpers");

const {
  comparePassword,
  hashPassword,
} = require("@/utils/security/passwordUtil");

const { generateAccessTokens } = require("@/utils/security/jwtUtil");

const { ERROR_CODES } = require("@/constants");

const accountsRepository = require("../accounts/accounts.repository");

const { formatLoginResponse, formatUserResponse } = require("./auth.formatter");

const { validateAccountStatus } = require("./auth.validator");

// ===============================
// Helper
// ===============================

const buildTokenPayload = (account) => ({
  accountId: account.accountId,
  username: account.username,
  roleCode: account.roleCode,
  roleLabel: account.roleLabel,
});

// ===============================
// Login
// ===============================

// staffs.repository.js

// findIdentityByAccountId(accountId)

// return:

// {
//  staffId,
//  staffCode,
//  fullName
// }
const resolveAccountIdentity = async (account, connection = db) => {
  switch (account.roleCode) {
    case "STUDENT": {
      const studentsService = require("../students/students.service");

      return studentsService.findByAccountId(
        account.accountId,
        connection,
      );
    }

    case "STAFF": {
      const staffsService = require("../staffs/staffs.service");

      return staffsService.findByAccountId(
        account.accountId,
        connection,
      );
    }

    default:
      return null;
  }
};

const login = async (usernameOrEmail, password, connection = db) => {
  const [usernameAccount, emailAccount] = await Promise.all([
    accountsRepository.findByUsername(usernameOrEmail, connection),
    accountsRepository.findByEmail(usernameOrEmail, connection),
  ]);

  const account = usernameAccount || emailAccount;

  throwIf(
    !account,
    AppError.UnauthorizedError,
    ERROR_CODES.INVALID_CREDENTIALS,
  );

  validateAccountStatus(account);

  const matched = await comparePassword(password, account.passwordHash);

  throwIf(
    !matched,
    AppError.UnauthorizedError,
    ERROR_CODES.INVALID_CREDENTIALS,
  );

  const identity = await resolveAccountIdentity(account, connection);

  throwIf(
    !matched,
    AppError.UnauthorizedError,
    ERROR_CODES.INVALID_CREDENTIALS,
  );

  const tokens = generateAccessTokens(buildTokenPayload(account));

  return formatLoginResponse({
    user: account,
    identity,
    ...tokens,
  });
};

// ===============================
// Logout
// ===============================

const logout = async () => {
  return {
    success: true,
  };
};

// ===============================
// Current User
// ===============================

const getMe = async (accountId, connection = db) => {
  const account = await accountsRepository.findById(accountId, connection);

  throwIf(
    !account,

    AppError.NotFoundError,

    ERROR_CODES.ACCOUNT_NOT_FOUND,
  );

  validateAccountStatus(account);

  return formatUserResponse(account);
};

// ===============================
// Change Password
// ===============================

const changePassword = async (
  accountId,
  currentPassword,
  newPassword,
  connection = db,
) => {
  const account = await accountsRepository.findById(accountId, connection);

  throwIf(
    !account,

    AppError.NotFoundError,

    ERROR_CODES.ACCOUNT_NOT_FOUND,
  );

  const matched = await comparePassword(currentPassword, account.passwordHash);

  throwIf(
    !matched,

    AppError.BadRequestError,

    "CURRENT_PASSWORD_INVALID",
  );

  const passwordHash = await hashPassword(newPassword);

  await accountsRepository.update(
    accountId,

    {
      passwordHash,
    },

    connection,
  );

  return {
    changed: true,
  };
};

module.exports = {
  login,
  logout,
  getMe,
  changePassword,
};
