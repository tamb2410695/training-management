const express = require("express");

const router = express.Router();

const { ROLES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

const coursesMiddleware = require("../../middlewares/courses.middleware");

const coursesController = require("./courses.controller");

router.get(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  coursesMiddleware.validateGetListMiddleware,
  coursesController.getList,
);

router.get(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  coursesMiddleware.validateGetByIdMiddleware,
  coursesController.getById,
);

router.post(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  coursesMiddleware.validateCreateMiddleware,
  coursesController.create,
);

router.put(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  // validateUpdateMiddleware,
  coursesController.update,
);

router.patch(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  coursesMiddleware.validatePartialUpdateMiddleware,
  coursesController.update,
);

router.delete(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  // validateRemoveMiddleware,
  coursesController.remove,
);

module.exports = router;
