const express = require("express");
const router = express.Router();

const { ROUTES } = require("@/constants");
const { createValidator, createMultiValidator } = require("@/utils");

const courseCategoriesController = require("./courseCategories.controller");
const courseCategoriesMiddleware = require("./courseCategories.middleware");

router.get(
  ROUTES.COURSE_CATEGORY.ROOT,
  createValidator(courseCategoriesMiddleware.getList, "query"),
  courseCategoriesController.getList,
);

router.get(
  ROUTES.COURSE_CATEGORY.DETAIL,
  createValidator(courseCategoriesMiddleware.getById, "params"),
  courseCategoriesController.getById,
);

router.post(
  ROUTES.COURSE_CATEGORY.ROOT,
  createValidator(courseCategoriesMiddleware.create),
  courseCategoriesController.create,
);

router.patch(
  ROUTES.COURSE_CATEGORY.DETAIL,
  createMultiValidator(courseCategoriesMiddleware.update),
  courseCategoriesController.update,
);

router.delete(
  ROUTES.COURSE_CATEGORY.DETAIL,
  createValidator(courseCategoriesMiddleware.remove, "params"),
  courseCategoriesController.remove,
);

module.exports = router;