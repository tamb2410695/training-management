const express = require("express");

const router = express.Router();

const { ROUTES } = require("@/constants");

const registrationsMiddleware = require("./registrations.middleware");

const registrationsController = require("./registrations.controller");

const { createValidator, createMultiValidator } = require("@/utils/helpers");

// ===============================
// Query
// ===============================

router.get(
  ROUTES.REGISTRATION.ROOT,

  createValidator(registrationsMiddleware.getList, "query"),

  registrationsController.getList,
);

// ===============================
// CRUD
// ===============================

router.post(
  ROUTES.REGISTRATION.ROOT,

  createValidator(registrationsMiddleware.create),

  registrationsController.create,
);

router.get(
  ROUTES.REGISTRATION.DETAIL,

  createValidator(registrationsMiddleware.getById, "params"),

  registrationsController.getById,
);

router.patch(
  ROUTES.REGISTRATION.DETAIL,

  createMultiValidator(registrationsMiddleware.partialUpdate),

  registrationsController.update,
);

router.delete(
  ROUTES.REGISTRATION.DETAIL,

  createValidator(registrationsMiddleware.getById, "params"),

  registrationsController.remove,
);

// ===============================
// Business Actions
// ===============================

router.patch(
  ROUTES.REGISTRATION.APPROVE,

  createMultiValidator(registrationsMiddleware.approve),

  registrationsController.approve,
);

router.patch(
  ROUTES.REGISTRATION.REJECT,

  createValidator(registrationsMiddleware.reject, "params"),

  registrationsController.reject,
);

module.exports = router;
