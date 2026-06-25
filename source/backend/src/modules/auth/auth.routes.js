const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const { validateLogin, validateRegister } = require("./auth.validator");
const { authenticate } = require("../../middlewares/auth.middleware");
const { createValidationMiddleware } = require("../../utils/helpers");

router.post(
  "/register",
  createValidationMiddleware(validateRegister),
  authController.register,
);
router.post(
  "/login",
  createValidationMiddleware(validateLogin),
  authController.login,
);
// router.post("/refresh-token", createValidationMiddleware(REFRESH_TOKEN_EXPIRES));
router.post("/logout", authController.logout);

// Các API bên dưới bắt buộc phải đi qua Middleware xác thực `authenticate`
// router.get("/me", authenticate, authController.getMe);
// router.patch(
//   "/change-password",
//   authenticate,
//   authValidator.validateChangePassword,
//   authController.changePassword,
// );
// router.patch("/reset-password", authController.resetPassword);

module.exports = router;
