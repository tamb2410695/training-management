const express = require("express");

const router = express.Router();

const { ROLES, GRADE_ROUTES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

// router.get(GRADE_ROUTES.ROOT, controller.getList);

// router.post(GRADE_ROUTES.ROOT, controller.create);

// router.get(GRADE_ROUTES.DETAIL, controller.getById);

// router.patch(GRADE_ROUTES.DETAIL, controller.update);

// router.delete(GRADE_ROUTES.DETAIL, controller.remove);

// router.patch(GRADE_ROUTES.PUBLISH, controller.publish);

// router.patch(GRADE_ROUTES.LOCK, controller.lock);

module.exports = router;
