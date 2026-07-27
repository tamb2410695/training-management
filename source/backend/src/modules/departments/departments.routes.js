const express = require("express");
const router = express.Router();

const { ROUTES } = require("../../constants");
const departmentsController = require("./departments.controller");

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
} = require("./departments.validator");

router.get(
  ROUTES.DEPARTMENT.ROOT,
  createValidationMiddleware(validateGetList, "query"),
  departmentsController.getList,
);

router.post(
  ROUTES.DEPARTMENT.ROOT,
  createValidationMiddleware(validateCreate),
  departmentsController.create,
);

router.get(
  ROUTES.DEPARTMENT.DETAIL,
  createMultiValidator(validateGetById, "params"),
  departmentsController.getById,
);

router.patch(
  ROUTES.DEPARTMENT.DETAIL,
  createMultiValidator(validatePartialUpdate),
  departmentsController.update,
);

router.put(
  ROUTES.DEPARTMENT.DETAIL,
  createMultiValidator(validateUpdate),
  departmentsController.update,
);

router.delete(
  ROUTES.DEPARTMENT.DETAIL,
  createValidationMiddleware(validateRemove, "params"),
  departmentsController.remove,
);

module.exports = router;