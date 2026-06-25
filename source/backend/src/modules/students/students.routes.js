const express = require("express");

const router = express.Router();

const { ROLES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

const studentsMiddleware = require("../../middlewares/students.middleware");

const studentsController = require("./students.controller");
const { validateGetList, validateGetById, validateCreate, validateUpdate, validatePartialUpdate, validateRemove } = require("./students.validator");
const {
  createValidationMiddleware,
  createMultiValidator,
} = require("../../utils/helpers/validators/middlewareHelper");

router.get(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetList, "query"),
  studentsController.getList,
);

router.get(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetById, "params"),
  studentsController.getById,
);

router.post(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateCreate),
  studentsController.create,
);

router.put(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createMultiValidator(validateUpdate),
  studentsController.update,
);

router.patch(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createMultiValidator(validatePartialUpdate),
  studentsController.update,
);

router.delete(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateRemove, "params"),
  studentsController.remove,
);

module.exports = router;
