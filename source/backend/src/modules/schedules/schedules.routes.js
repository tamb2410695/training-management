const express = require("express");

const router = express.Router();

const { ROLES, SCHEDULE_ROUTES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

// router.get(SCHEDULE_ROUTES.ROOT, controller.getList);

// router.post(SCHEDULE_ROUTES.ROOT, controller.create);

// router.get(SCHEDULE_ROUTES.DETAIL, controller.getById);

// router.patch(SCHEDULE_ROUTES.DETAIL, controller.update);

// router.delete(SCHEDULE_ROUTES.DETAIL, controller.remove);

// router.get(SCHEDULE_ROUTES.ATTENDANCE, controller.getAttendance);

module.exports = router;
