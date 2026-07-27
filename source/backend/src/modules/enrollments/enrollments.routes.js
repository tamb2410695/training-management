const express = require("express");

const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");
const enrollmentsController = require("./enrollments.controller")
const { authenticate, authorize } = require("../../middlewares");

router.get(ROUTES.ENROLLMENT.ROOT, enrollmentsController.getList);

router.post(ROUTES.ENROLLMENT.ROOT, enrollmentsController.create);

router.get(ROUTES.ENROLLMENT.DETAIL, enrollmentsController.getById);

router.patch(ROUTES.ENROLLMENT.DETAIL, enrollmentsController.update);

router.delete(ROUTES.ENROLLMENT.DETAIL, enrollmentsController.remove);

// router.patch(ROUTES.ENROLLMENT.CONFIRM, enrollmentsController.confirm);

// router.patch(ROUTES.ENROLLMENT.CANCEL, enrollmentsController.cancel);

// router.patch(ROUTES.ENROLLMENT.REFUND, enrollmentsController.refund);

module.exports = router;
