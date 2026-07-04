const db = require("../../config/database");
const AppError = require("../../utils/errors");
const { throwIf } = require("../../utils/helpers");
const {
  verifyPassword,
  hashPassword,
  comparePassword,
} = require("../../utils/security/passwordUtil");

const accountsService = require("../accounts/accounts.service");
const accountsRepository = require("../accounts/accounts.repository");
const { ERROR_MESSAGES, ACCOUNT_STATUS } = require("../../constants");
const { generateTokens, verifyToken } = require("../../utils/security/jwtUtil");
const { AUTH_MESSAGES, JWT_CONFIG, TOKEN_TYPES } = require("./auth.constants");

const register = async (accountData) => {
  const data = {
    ...accountData,
    roleCode: accountData.roleCode || "STUDENT",
  };
  return await accountsService.create(data);
};

const login = async (usernameOrEmail, password, connection = db) => {
  const [existedUsername, existedEmail] = await Promise.all([
    accountsRepository.findByUsername(usernameOrEmail, connection),
    accountsRepository.findByEmail(usernameOrEmail, connection),
  ]);

  const account = existedUsername || existedEmail;
  throwIf(!account, AppError.NotFoundError, ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

  if (account.accountStatus === "LOCKED") {
    throw new AppError.ForbiddenError(ERROR_MESSAGES.AUTH.ACCESS_DENIED);
  }
  if (
    account.accountStatus === "DISABLED" ||
    account.accountStatus === "DELETED"
  ) {
    throw new AppError.ForbiddenError(ERROR_MESSAGES.AUTH.ACCESS_DENIED);
  }

  const isMatch = await comparePassword(password, account.passwordHash);
  throwIf(
    !isMatch,
    AppError.UnauthorizedError,
    ERROR_MESSAGES.AUTH.UNAUTHORIZED,
  );

  const tokenPayload = {
    accountId: account.accountId,
    username: account.username,
    roleCode: account.roleCode,
    roleName: account.roleName,
  };

  const tokens = generateTokens(tokenPayload);

  await accountsRepository.update(
    account.accountId,
    { refreshToken: tokens.refreshToken },
    connection,
  );

  const { passwordHash: _, refreshToken: __, ...safeAccountData } = account;

  return {
    user: safeAccountData,
    ...tokens,
  };
};

const refresh = async (token, connection = db) => {
  throwIf(!token, AppError.BadRequestError, "Refresh token is required");

  try {
    const decoded = verifyToken(token, JWT_CONFIG.REFRESH_SECRET);

    const account = await accountsRepository.findById(
      decoded.accountId,
      connection,
    );
    throwIf(
      !account || account.refreshToken !== token,
      AppError.UnauthorizedError,
      AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
    );
    if (
      [
        ACCOUNT_STATUS.LOCKED,
        ACCOUNT_STATUS.DISABLED,
        ACCOUNT_STATUS.DELETED,
      ].includes(account.accountStatus)
    ) {
      throw new AppError.ForbiddenError(AUTH_MESSAGES.ACCOUNT_DISABLED);
    }

    const tokenPayload = {
      accountId: account.accountId,
      username: account.username,
      roleCode: account.roleCode,
      roleName: account.roleName,
    };

    const tokens = generateTokens(tokenPayload);

    await accountsRepository.update(
      account.accountId,
      { refreshToken: tokens.refreshToken },
      connection,
    );

    return tokens;
  } catch (err) {
    throw new AppError.UnauthorizedError(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
  }
};

const logout = async (accountId, connection = db) => {
  await accountsRepository.update(
    accountId,
    { refreshToken: null },
    connection,
  );
  return { message: AUTH_MESSAGES.LOGOUT_SUCCESS };
};

const getMe = async (accountId) => {
  return await accountsService.getById(accountId);
};

const changePassword = async (
  accountId,
  currentPassword,
  newPassword,
  connection = db,
) => {
  const account = await accountsRepository.findById(accountId, connection);
  throwIf(!account, AppError.NotFoundError, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);

  const isMatch = await comparePassword(currentPassword, account.passwordHash);
  throwIf(!isMatch, AppError.BadRequestError, "Current password is incorrect");

  const newPasswordHash = await hashPassword(newPassword);
  await accountsRepository.update(
    accountId,
    { passwordHash: newPasswordHash, refreshToken: null },
    connection,
  );
};

const resetPassword = async (email, newPassword, connection = db) => {
  const account = await accountsRepository.findByEmail(email, connection);
  throwIf(
    !account,
    AppError.NotFoundError,
    "No account associated with this email",
  );

  const newPasswordHash = await hashPassword(newPassword);
  await accountsRepository.update(
    account.accountId,
    { passwordHash: newPasswordHash, refreshToken: null },
    connection,
  );
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  getMe,
  changePassword,
  resetPassword,
};
