const express = require("express");

const router = express.Router();

const { ROLES, ENROLLMENT_ROUTES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

// router.get(ENROLLMENT_ROUTES.ROOT, enrollmentsController.getList);

// router.post(ENROLLMENT_ROUTES.ROOT, enrollmentsController.create);

// router.get(ENROLLMENT_ROUTES.DETAIL, enrollmentsController.getById);

// router.patch(ENROLLMENT_ROUTES.DETAIL, enrollmentsController.update);

// router.delete(ENROLLMENT_ROUTES.DETAIL, enrollmentsController.remove);

// router.patch(ENROLLMENT_ROUTES.CONFIRM, enrollmentsController.confirm);

// router.patch(ENROLLMENT_ROUTES.CANCEL, enrollmentsController.cancel);

// router.patch(ENROLLMENT_ROUTES.REFUND, enrollmentsController.refund);

module.exports = router;
