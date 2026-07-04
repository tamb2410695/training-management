const { SUCCESS_MESSAGES } = require("../../constants");
const { asyncHandler, successResponse } = require("../../utils/helpers");
const authService = require("./auth.service");


const register = asyncHandler(async (req, res, next) => {
  const result = await authService.register(req.body);
  return successResponse(res, result, SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS, 201);
});

const login = asyncHandler(async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;
  const result = await authService.login(usernameOrEmail, password);
  
  return successResponse(res, result, SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS);
});

const refresh = asyncHandler(async (req, res, next) => {
  const token = req.body.refreshToken || req.cookies?.refreshToken;
  
  const result = await authService.refresh(token);
  return successResponse(res, result, SUCCESS_MESSAGES.AUTH.TOKEN_REFRESHED);
});

const logout = asyncHandler(async (req, res, next) => {
  const accountId = req.user.accountId;
  
  const result = await authService.logout(accountId);
  return successResponse(res, null, result.message || SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS);
});

const getMe = asyncHandler(async (req, res, next) => {
  const result = await authService.getMe(req.user.accountId);
  return successResponse(res, result, "Get current user profile successful");
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  return successResponse(res, { email }, SUCCESS_MESSAGES.AUTH.PASSWORD_RESET_EMAIL_SENT);
});

const changePassword = asyncHandler(async (req, res, next) => {
  const accountId = req.user.accountId;
  const { currentPassword, newPassword } = req.body;
  
  await authService.changePassword(accountId, currentPassword, newPassword);
  return successResponse(res, null, SUCCESS_MESSAGES.AUTH.PASSWORD_CHANGED);
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;
  
  await authService.resetPassword(email, newPassword);
  return successResponse(res, null, SUCCESS_MESSAGES.AUTH.PASSWORD_RESET_SUCCESS);
});

module.exports = {
  register,
  login,
  refresh,
  logout,
  getMe,
  forgotPassword,
  changePassword,
  resetPassword,
};