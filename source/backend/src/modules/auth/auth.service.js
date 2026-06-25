const AppError = require("../../utils/errors");
const { throwIf } = require("../../utils/helpers");
const {
  verifyPassword,
  hashPassword,
  comparePassword,
} = require("../../utils/security/passwordUtil");

const accountsService = require("../accounts/accounts.service");
const accountsRepository = require("../accounts/accounts.repository");
const { ERROR_MESSAGES } = require("../../constants");
const { generateTokens } = require("../../utils/security/jwtUtil");

const register = async (accountData) => {
  const data = { ...accountData, roleName: accountData.roleName || "STUDENT" };
  return await accountsService.create(data);
};

const login = async (usernameOrEmail, password) => {
  const [existedUsername, existedEmail] = await Promise.all([
    accountsRepository.findByUsername(usernameOrEmail),
    accountsRepository.findByEmail(usernameOrEmail),
  ]);

  const account = existedUsername || existedEmail;
  throwIf(!account, AppError.NotFoundError, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);

  console.log(account);
  const isMatch = await comparePassword(password, account.passwordHash);
  throwIf(!isMatch, AppError.UnauthorizedError, "Invalid username or password");

  const tokenPayload = {
    accountId: account.accountId,
    username: account.username,
    roleName: account.roleName,
  };
  
  const tokens = generateTokens(tokenPayload);

  const { passwordHash: _, ...safeAccountData } = account;

  return {
    user: {
      ...safeAccountData,
    },
    ...tokens,
  };
};

// const refresh = async (token) => {
//   throwIf(!token, AppError.BadRequestError, "Refresh token is required");

//   try {
//     const decoded = jwt.verify(token, JWT_CONFIG.REFRESH_SECRET);
//     const tokenPayload = {
//       accountId: decoded.accountId,
//       username: decoded.username,
//       roleName: decoded.roleName,
//     };
//     return generateTokens(tokenPayload);
//   } catch (err) {
//     throw new AppError.UnauthorizedError("Invalid or expired refresh token");
//   }
// };

const getMe = async (accountId) => {
  return await accountsService.getById(accountId);
};

const changePassword = async (accountId, currentPassword, newPassword) => {
  const account = await accountsRepository.findById(accountId);
  throwIf(!account, AppError.NotFoundError, "Account not found");

  const isMatch = await verifyPassword(currentPassword, account.passwordHash);
  throwIf(!isMatch, AppError.BadRequestError, "Current password is incorrect");

  const newPasswordHash = await hashPassword(newPassword);
  await accountsRepository.update(accountId, { passwordHash: newPasswordHash });
};

const resetPassword = async (email, newPassword) => {
  const account = await accountsRepository.findByEmail(email);
  throwIf(
    !account,
    AppError.NotFoundError,
    "No account associated with this email",
  );

  const newPasswordHash = await hashPassword(newPassword);
  await accountsRepository.update(account.accountId, {
    passwordHash: newPasswordHash,
  });
};

module.exports = {
  register,
  login,
  // refresh,
  getMe,
  changePassword,
  resetPassword,
};
