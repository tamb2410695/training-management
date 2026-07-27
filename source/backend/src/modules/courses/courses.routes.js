const express = require("express");
const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");
const { authenticate, authorize } = require("../../middlewares");

const coursesController = require("./courses.controller");
const { createValidationMiddleware, createMultiValidator } = require("../../utils/helpers");
const { validateGetById, validateGetList, validateCreate, validateUpdate, validatePartialUpdate, validateRemove } = require("./courses.validator");

router.get(
  ROUTES.COURSE.ROOT, 
  createValidationMiddleware(validateGetList, "query"), 
  coursesController.getList
);

router.get(
  ROUTES.COURSE.DETAIL, 
  createValidationMiddleware(validateGetById, "params"), 
  coursesController.getById
);

router.post(
  ROUTES.COURSE.ROOT, 
  createValidationMiddleware(validateCreate),
  coursesController.create
);

router.put(
  ROUTES.COURSE.DETAIL, 
  createMultiValidator(validateUpdate), 
  coursesController.update
);

router.patch(
  ROUTES.COURSE.DETAIL, 
  createMultiValidator(validatePartialUpdate), 
  coursesController.partialUpdate
);

router.delete(
  ROUTES.COURSE.DETAIL, 
  createValidationMiddleware(validateRemove, "params"), 
  coursesController.remove
);

router.patch(
  ROUTES.COURSE.PUBLISH,
  createValidationMiddleware(validateUpdate, "params"), 
  coursesController.publish
);

router.patch(
  ROUTES.COURSE.LOCK,
  createValidationMiddleware(validateUpdate, "params"), 
  coursesController.lock
);

router.get(
  ROUTES.COURSE.DOCUMENTS,
  createValidationMiddleware(validateUpdate, "params"), 
  coursesController.getDocuments
);

module.exports = router;