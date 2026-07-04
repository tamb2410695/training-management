const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const authValidator = require("./auth.validator");
const { authenticate } = require("../../middlewares/auth.middleware");
const { createValidationMiddleware } = require("../../utils/helpers");
const { ROUTES } = require("../../constants");

router.post(
  ROUTES.AUTH.REGISTER,
  createValidationMiddleware(authValidator.validateRegister),
  authController.register,
);

router.post(
  ROUTES.AUTH.LOGIN,
  createValidationMiddleware(authValidator.validateLogin),
  authController.login,
);

router.post(
  ROUTES.AUTH.REFRESH,
  createValidationMiddleware(
    authValidator.validateRefresh || authValidator.validateRefreshToken,
  ),
  authController.refresh,
);

router.post(
  ROUTES.AUTH.FORGOT_PASSWORD,
  createValidationMiddleware(authValidator.validateForgotPassword),
  authController.forgotPassword,
);

router.post(
  ROUTES.AUTH.RESET_PASSWORD,
  createValidationMiddleware(authValidator.validateResetPassword),
  authController.resetPassword,
);

router.post(ROUTES.AUTH.LOGOUT, authenticate, authController.logout);

router.get(ROUTES.AUTH.PROFILE, authenticate, authController.getMe);

router.patch(
  ROUTES.AUTH.CHANGE_PASSWORD,
  authenticate,
  createValidationMiddleware(authValidator.validateChangePassword),
  authController.changePassword,
);

module.exports = router;
