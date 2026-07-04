const express = require("express");

const router = express.Router();

const { ROLES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

// router.get(PAYMENT_ROUTES.ROOT, controller.getList);

// router.post(PAYMENT_ROUTES.ROOT, controller.create);

// router.get(PAYMENT_ROUTES.DETAIL, controller.getById);

// router.patch(PAYMENT_ROUTES.DETAIL, controller.update);

// router.delete(PAYMENT_ROUTES.DETAIL, controller.remove);

// router.patch(PAYMENT_ROUTES.CONFIRM, controller.confirm);

// router.patch(PAYMENT_ROUTES.REFUND, controller.refund);

module.exports = router;
