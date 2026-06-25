const express = require("express");

const router = express.Router();

const { ROLES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

const enrollmentsController = require("./enrollments.controller");
const {
  createValidationMiddleware,
  createMultiValidator,
} = require("../../utils/helpers");
const {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
} = require("./enrollments.validator");

router.get(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetList, "query"),
  enrollmentsController.getList,
);

router.get(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetById, "params"),
  enrollmentsController.getById,
);

router.post(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateCreate),
  enrollmentsController.create,
);

router.put(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createMultiValidator(validateUpdate),
  enrollmentsController.update,
);

router.patch(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validatePartialUpdate),
  enrollmentsController.update,
);

router.delete(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateRemove, "params"),
  enrollmentsController.remove,
);

module.exports = router;
