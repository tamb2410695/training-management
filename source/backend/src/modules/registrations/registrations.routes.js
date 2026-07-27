const express = require("express");
const router = express.Router();

const { ROUTES } = require("../../constants");
const registrationsController = require("./registrations.controller");
const { createValidationMiddleware, createMultiValidator } = require("../../utils/helpers");
const {
  validateCreate,
  validateGetList,
  validateGetById,
  validateActivate,
  validateUpdate,
  validatePartialUpdate,
} = require("./registrations.validator");

router.get(
  ROUTES.REGISTRATION.ROOT,
  createValidationMiddleware(validateGetList, "query"),
  registrationsController.getList,
);

router.post(
  ROUTES.REGISTRATION.ROOT,
  createValidationMiddleware(validateCreate),
  registrationsController.create,
);

router.post(
  ROUTES.REGISTRATION.ACTIVATE,
  createMultiValidator(validateActivate),
  registrationsController.activate,
);

router.get(
  ROUTES.REGISTRATION.DETAIL,
  createValidationMiddleware(validateGetById, "params"),
  registrationsController.getById,
);

router.patch(
  ROUTES.REGISTRATION.DETAIL,
  createMultiValidator(validatePartialUpdate),
  registrationsController.update,
);

router.put(
  ROUTES.REGISTRATION.DETAIL,
  createMultiValidator(validateUpdate),
  registrationsController.update,
);

router.delete(
  ROUTES.REGISTRATION.DETAIL,
  createValidationMiddleware(validateGetById, "params"),
  registrationsController.remove,
);

module.exports = router;