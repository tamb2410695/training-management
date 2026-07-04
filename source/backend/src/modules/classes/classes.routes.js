const express = require("express");

const router = express.Router();

const { ROUTES } = require("../../constants");

const classesController = require("./classes.controller")

router.get(ROUTES.CLASS.ROOT, classesController.getList);

router.post(ROUTES.CLASS.ROOT, classesController.create);

router.get(ROUTES.CLASS.DETAIL, classesController.getById);

router.patch(ROUTES.CLASS.DETAIL, classesController.update);

router.delete(ROUTES.CLASS.DETAIL, classesController.remove);

router.get(ROUTES.CLASS.SCHEDULES, classesController.getSchedules);

router.patch(ROUTES.CLASS.OPEN_REGISTRATION, classesController.openRegistration);

router.patch(ROUTES.CLASS.CLOSE_REGISTRATION, classesController.closeRegistration);

router.patch(ROUTES.CLASS.START, classesController.start);

router.patch(ROUTES.CLASS.COMPLETE, classesController.complete);

module.exports = router;