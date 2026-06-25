const express = require("express");

const router = express.Router();

const { ROLES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

const {
  validateGetListMiddleware,
  validateGetByIdMiddleware,
  validateCreateMiddleware,
  validateUpdateMiddleware,
  validatePartialUpdateMiddleware,
  validateRemoveMiddleware,
} = require("../../middlewares/accounts.middleware");

const accountsController = require("./accounts.controller");

router.get(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  validateGetListMiddleware,
  accountsController.getList,
);

router.get(
  "/:id",
  authenticate,
  // authorize(ROLES.ADMIN),
  // validateGetByIdMiddleware,
  accountsController.getById,
);

router.post(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  validateCreateMiddleware,
  accountsController.create,
);

router.put(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  validateUpdateMiddleware,
  accountsController.update,
);

router.patch(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  validatePartialUpdateMiddleware,
  accountsController.update,
);

router.delete(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  validateRemoveMiddleware,
  accountsController.remove,
);

module.exports = router;
