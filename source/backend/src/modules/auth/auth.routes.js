const express = require("express");

const router = express.Router();

const { ROUTES } = require("@/constants");

const authController = require("./auth.controller");

const { authGuard } = require("@/middlewares/auth.middleware");

// ===============================
// Registration
// ===============================

router.post(
  ROUTES.AUTH.REGISTER,
  authController.register,
);

// ===============================
// Authentication
// ===============================

router.post(
  ROUTES.AUTH.LOGIN,
  authController.login,
);

// ===============================
// Profile
// ===============================

router.get(
  ROUTES.AUTH.PROFILE,

  authGuard,

  authController.getMe,
);

// ===============================
// Password
// ===============================

router.patch(
  ROUTES.AUTH.CHANGE_PASSWORD,
  authGuard,
  authController.changePassword,
);

module.exports = router;
