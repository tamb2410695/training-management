const express = require("express");
const router = express.Router();

const { ROUTES } = require("../../../constants");
const staffDepartmentsController = require("./departments.controller");

const {
  createValidationMiddleware,
  createMultiValidator,
} = require("../../../utils/helpers");

const {
  validateGetList,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
} = require("./departments.validator");

router.get(
  ROUTES.STAFF_DEPARTMENT.ROOT,
  createValidationMiddleware(validateGetList, "query"),
  staffDepartmentsController.getList,
);

router.post(
  ROUTES.STAFF_DEPARTMENT.ASSIGN,
  createValidationMiddleware(validateCreate),
  staffDepartmentsController.assign,
);


router.get(
  "/staff/:staffId/department/:departmentId",
  staffDepartmentsController.getByCompositeKey,
);


router.patch(
  "/staff/:staffId/department/:departmentId",
  createMultiValidator(validatePartialUpdate),
  staffDepartmentsController.updateAssignment,
);

router.put(
  "/staff/:staffId/department/:departmentId",
  createMultiValidator(validateUpdate),
  staffDepartmentsController.updateAssignment,
);


router.delete(
  ROUTES.STAFF_DEPARTMENT.REMOVE,
  staffDepartmentsController.remove,
);

module.exports = router;