const express = require("express");

const router = express.Router();

const { ROLES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

const classesController = require("./classes.controller");
const { createValidationMiddleware, createMultiValidator } = require("../../utils/helpers/validators/middlewareHelper");
const { validateGetList, validateGetById, validateCreate, validateUpdate, validatePartialUpdate, validateRemove } = require("./classes.validator");

router.get(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetList, "query"),
  classesController.getList,
);

router.get(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetById, "params"),
  classesController.getById,
);

router.post(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateCreate),
  classesController.create,
);

router.put(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createMultiValidator(validateUpdate),
  classesController.update,
);

router.patch(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createMultiValidator(validatePartialUpdate),
  classesController.update,
);

router.delete(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  // validateRemoveMiddleware,
  createValidationMiddleware(validateRemove),
  classesController.remove,
);

module.exports = router;
