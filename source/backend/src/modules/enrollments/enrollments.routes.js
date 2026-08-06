const express = require("express");

const router = express.Router();

const { ROUTES } = require("@/constants");

const enrollmentsMiddleware = require("./enrollments.middleware");

const enrollmentsController = require("./enrollments.controller");

const { createValidator, createMultiValidator } = require("@/utils/helpers");

// ===============================
// Query
// ===============================

router.get(
  ROUTES.ENROLLMENT.ROOT,

  createValidator(
    enrollmentsMiddleware.getList,

    "query",
  ),

  enrollmentsController.getList,
);

// ===============================
// CRUD
// ===============================

router.post(
  ROUTES.ENROLLMENT.ROOT,

  createValidator(enrollmentsMiddleware.create),

  enrollmentsController.create,
);

router.get(
  ROUTES.ENROLLMENT.DETAIL,

  createValidator(
    enrollmentsMiddleware.getById,

    "params",
  ),

  enrollmentsController.getById,
);

router.patch(
  ROUTES.ENROLLMENT.DETAIL,

  createMultiValidator(enrollmentsMiddleware.partialUpdate),

  enrollmentsController.update,
);

router.delete(
  ROUTES.ENROLLMENT.DETAIL,

  createValidator(
    enrollmentsMiddleware.getById,

    "params",
  ),

  enrollmentsController.remove,
);

// ===============================
// Business Actions
// ===============================

router.patch(
  ROUTES.ENROLLMENT.APPROVE,

  createValidator(
    enrollmentsMiddleware.approve,

    "params",
  ),

  enrollmentsController.approve,
);

router.patch(
  ROUTES.ENROLLMENT.REJECT,

  createValidator(
    enrollmentsMiddleware.reject,

    "params",
  ),

  enrollmentsController.reject,
);

module.exports = router;
