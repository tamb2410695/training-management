const express = require("express");

const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

router.get(ROUTES.ATTENDANCE.ROOT, controller.getList);

router.post(ROUTES.ATTENDANCE.ROOT, controller.create);

router.get(ROUTES.ATTENDANCE.DETAIL, controller.getById);

router.patch(ROUTES.ATTENDANCE.DETAIL, controller.update);

router.delete(ROUTES.ATTENDANCE.DETAIL, controller.remove);

module.exports = router;
