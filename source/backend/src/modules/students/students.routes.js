const express = require("express");
const router = express.Router();

const { ROUTES } = require("../../constants");
const studentsController = require("./students.controller");
const { createValidationMiddleware, createMultiValidator } = require("../../utils/helpers");
const {
  validateCreate,
  validateGetList,
  validateGetById,
  validateUpdate,
  validatePartialUpdate,
} = require("./students.validator");

router.get(
  ROUTES.STUDENT.ROOT ,
  createValidationMiddleware(validateGetList, "query"),
  studentsController.getList,
);

router.post(
  ROUTES.STUDENT.ROOT ,
  createValidationMiddleware(validateCreate),
  studentsController.create,
);

router.get(
  ROUTES.STUDENT.DETAIL,
  createValidationMiddleware(validateGetById, "params"),
  studentsController.getById,
);

router.patch(
  ROUTES.STUDENT.DETAIL,
  createMultiValidator(validatePartialUpdate),
  studentsController.update,
);

router.put(
  ROUTES.STUDENT.DETAIL,
  createMultiValidator(validateUpdate),
  studentsController.update,
);

router.delete(
  ROUTES.STUDENT.DETAIL,
  createValidationMiddleware(validateGetById, "params"),
  studentsController.remove,
);

module.exports = router;