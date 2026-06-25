const { asyncHandler, successResponse } = require("../../utils/helpers");
const authService = require("./auth.service");

const register = asyncHandler(async (req, res, next) => {
  const result = await authService.register(req.body);
  return successResponse(res, result, "Account registered successfully", 201);
});

const login = asyncHandler(async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;
  const result = await authService.login(usernameOrEmail, password);
  return successResponse(res, result, "Login successful");
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;
  const result = await authService.refresh(refreshToken);
  return successResponse(res, result, "Token refreshed successfully");
});

const logout = asyncHandler(async (req, res, next) => {
  // Client chịu trách nhiệm xóa token phía Front-end
  return successResponse(res, null, "Logout successful");
});

const getMe = asyncHandler(async (req, res, next) => {
  const result = await authService.getMe(req.user.accountId);
  return successResponse(res, result, "Get current user profile successful");
});

const changePassword = asyncHandler(async (req, res, next) => {
  const accountId = req.user.accountId;
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(accountId, currentPassword, newPassword);
  return successResponse(res, null, "Password updated successfully");
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;
  await authService.resetPassword(email, newPassword);
  return successResponse(res, null, "Password has been reset successfully");
});

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  changePassword,
  resetPassword,
};