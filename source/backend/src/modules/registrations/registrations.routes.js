const express = require("express");
const router = express.Router();

const { ROUTES } = require("../../constants");
const registrationsController = require("./registrations.controller");
const { createValidationMiddleware, createMultiValidator } = require("../../utils/helpers");
const {
  validateCreate,
  validateGetList,
  validateGetById,
  validateGetByCode,
  validateUpdate,
  validatePartialUpdate,
} = require("./registrations.validator");

router.get(
  "/track/:code",
  createValidationMiddleware(validateGetByCode, "params"),
  registrationsController.getByCode,
);

router.get(
  ROUTES.REGISTRATION?.ROOT || "/",
  createValidationMiddleware(validateGetList, "query"),
  registrationsController.getList,
);

router.post(
  ROUTES.REGISTRATION?.ROOT || "/",
  createValidationMiddleware(validateCreate),
  registrationsController.create,
);

router.get(
  ROUTES.REGISTRATION?.DETAIL || "/:id",
  createValidationMiddleware(validateGetById, "params"),
  registrationsController.getById,
);


router.patch(
  ROUTES.REGISTRATION?.DETAIL || "/:id",
  createMultiValidator(validatePartialUpdate),
  registrationsController.update,
);

router.put(
  ROUTES.REGISTRATION?.DETAIL || "/:id",
  createMultiValidator(validateUpdate),
  registrationsController.update,
);

router.delete(
  ROUTES.REGISTRATION?.DETAIL || "/:id",
  createValidationMiddleware(validateGetById, "params"),
  registrationsController.remove,
);

module.exports = router;