const express = require("express");

const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

const paymentsController = require("./payments.controller")

router.get(ROUTES.PAYMENT.ROOT, paymentsController.getList);

router.post(ROUTES.PAYMENT.ROOT, paymentsController.create);

router.get(ROUTES.PAYMENT.DETAIL, paymentsController.getById);

// router.patch(ROUTES.PAYMENT.DETAIL, paymentsController.update);

router.delete(ROUTES.PAYMENT.DETAIL, paymentsController.remove);

// router.patch(ROUTES.PAYMENT.CONFIRM, paymentsController.confirm);

// router.patch(ROUTES.PAYMENT.REFUND, paymentsController.refund);

module.exports = router;
