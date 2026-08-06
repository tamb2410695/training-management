const express = require("express");

const router = express.Router();

const { ROUTES } = require("@/constants");

const classesMiddleware = require("./classes.middleware");

const classesController = require("./classes.controller");

const {
  createValidator,
  createMultiValidator,
} = require("@/utils/helpers");


// Query
router.get(
  ROUTES.CLASS.ROOT,
  createValidator(
    classesMiddleware.getList,
    "query",
  ),
  classesController.getList,
);


// CRUD
router.post(
  ROUTES.CLASS.ROOT,

  createValidator(classesMiddleware.create),

  classesController.create,
);

router.get(
  ROUTES.CLASS.DETAIL,

  createValidator(
    classesMiddleware.getById,

    "params",
  ),

  classesController.getById,
);

router.patch(
  ROUTES.CLASS.DETAIL,

  createMultiValidator(classesMiddleware.partialUpdate),

  classesController.update,
);

router.delete(
  ROUTES.CLASS.DETAIL,

  createValidator(
    classesMiddleware.getById,

    "params",
  ),

  classesController.remove,
);


// Business Actions
router.patch(
  ROUTES.CLASS.ASSIGN_INSTRUCTOR,

  createMultiValidator(classesMiddleware.assignInstructor),

  classesController.assignInstructor,
);

router.patch(
  ROUTES.CLASS.OPEN,

  createValidator(
    classesMiddleware.open,

    "params",
  ),

  classesController.open,
);

router.patch(
  ROUTES.CLASS.START,

  createValidator(
    classesMiddleware.start,

    "params",
  ),

  classesController.start,
);

router.patch(
  ROUTES.CLASS.COMPLETE,
  createValidator(
    classesMiddleware.complete,
    "params",
  ),
  classesController.complete,
);

router.patch(
  ROUTES.CLASS.CANCEL,
  createValidator(
    classesMiddleware.cancel,

    "params",
  ),
  classesController.cancel,
);


// Support
router.get(
  ROUTES.CLASS.CAPACITY,
  createValidator(
    classesMiddleware.getCapacity,
    "params",
  ),
  classesController.getCapacity,
);

module.exports = router;
