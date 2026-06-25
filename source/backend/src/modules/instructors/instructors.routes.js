const express = require("express");

const router = express.Router();

const { ROLES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

const instructorsMiddleware = require("../../middlewares/instructors.middleware");

const instructorsController = require("./instructors.controller");

router.get(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  instructorsMiddleware.validateGetListMiddleware,
  instructorsController.getList,
);

router.get(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  instructorsMiddleware.validateGetByIdMiddleware,
  instructorsController.getById,
);

router.post(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  instructorsMiddleware.validateCreateMiddleware,
  instructorsController.create,
);

router.put(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  // validateUpdateMiddleware,
  instructorsController.update,
);

router.patch(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  instructorsMiddleware.validatePartialUpdateMiddleware,
  instructorsController.update,
);

router.delete(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  // validateRemoveMiddleware,
  instructorsController.remove,
);

module.exports = router;
