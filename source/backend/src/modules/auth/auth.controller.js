const { SUCCESS_CODES } = require("@/constants");

const { asyncHandler, successResponse } = require("@/utils/helpers");

const authService = require("./auth.service");

const registrationsService = require("../registrations/registrations.service");

// ===============================
// Registration
// ===============================

const register = asyncHandler(async (req, res) => {
  const result = await registrationsService.create(req.body);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.STUDENT_REGISTRATION_SUBMITTED,

    201,
  );
});

// ===============================
// Authentication
// ===============================

const login = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const result = await authService.login(usernameOrEmail, password);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.LOGIN_SUCCESS,
  );
});

// ===============================
// Profile
// ===============================

const getMe = asyncHandler(async (req, res) => {
  const { accountId } = req.user;

  const result = await authService.getMe(accountId);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_FETCH_SUCCESS,
  );
});

// ===============================
// Password
// ===============================

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const { accountId } = req.user;

  await authService.changePassword(
    accountId,

    currentPassword,

    newPassword,
  );

  return successResponse(
    res,

    null,

    SUCCESS_CODES.PASSWORD_CHANGED,
  );
});

module.exports = {
  register,

  login,

  getMe,

  changePassword,
};
