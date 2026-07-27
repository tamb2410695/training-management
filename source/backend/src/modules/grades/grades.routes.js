const express = require("express");

const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

const gradesController = require("./grades.controller");

router.get(ROUTES.ROOT, gradesController.getList);

router.post(ROUTES.ROOT, gradesController.create);

router.get(ROUTES.DETAIL, gradesController.getById);

// router.patch(ROUTES.DETAIL, gradesController.update);

// router.delete(ROUTES.DETAIL, gradesController.remove);

// router.patch(ROUTES.PUBLISH, gradesController.publish);

// router.patch(ROUTES.LOCK, gradesController.lock);

module.exports = router;
