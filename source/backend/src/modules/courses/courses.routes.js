const express = require("express");

const router = express.Router();

const { ROUTES } = require("@/constants");

const coursesMiddleware = require("./courses.middleware");

const coursesController = require("./courses.controller");

const {
  createValidator,
  createMultiValidator,
} = require("@/utils/helpers");


// ===============================
// Query
// ===============================

router.get(
  ROUTES.COURSE.ROOT,

  createValidator(
    coursesMiddleware.getList,
    "query",
  ),

  coursesController.getList,
);


router.get(
  ROUTES.COURSE.DETAIL,

  createValidator(
    coursesMiddleware.getById,
    "params",
  ),

  coursesController.getById,
);


// ===============================
// CRUD
// ===============================

router.post(
  ROUTES.COURSE.ROOT,

  createValidator(
    coursesMiddleware.create,
  ),

  coursesController.create,
);


router.patch(
  ROUTES.COURSE.DETAIL,

  createMultiValidator(
    coursesMiddleware.partialUpdate,
  ),

  coursesController.update,
);


router.delete(
  ROUTES.COURSE.DETAIL,

  createValidator(
    coursesMiddleware.getById,
    "params",
  ),

  coursesController.remove,
);


// ===============================
// Business Actions
// ===============================

router.patch(
  ROUTES.COURSE.PUBLISH,

  createValidator(
    coursesMiddleware.publish,
    "params",
  ),

  coursesController.publish,
);


router.patch(
  ROUTES.COURSE.ARCHIVE,

  createValidator(
    coursesMiddleware.archive,
    "params",
  ),

  coursesController.archive,
);


module.exports = router;