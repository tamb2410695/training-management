const express = require("express");
const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");
const { authenticate, authorize } = require("../../middlewares");

const roomsController = require("./rooms.controller");
const { 
  validateGetList, 
  validateGetById, 
  validateCreate, 
  validateUpdate, 
  validatePartialUpdate, 
  validateRemove,
} = require("./rooms.validator");

const {
  createValidationMiddleware,
} = require("../../utils/helpers/validators/middlewareHelper");

router.get(
  ROUTES.ROOM.ROOT,
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetList, "query"),
  roomsController.getList,
);

router.get(
  ROUTES.ROOM.DETAIL,
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetById, "params"),
  roomsController.getById,
);

router.post(
  ROUTES.ROOM.ROOT,
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateCreate, "body"),
  roomsController.create,
);

router.put(
  ROUTES.ROOM.DETAIL,
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateUpdate, "body"),
  roomsController.update,
);

router.patch(
  ROUTES.ROOM.DETAIL,
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validatePartialUpdate, "body"),
  roomsController.update,
);

router.delete(
  ROUTES.ROOM.DETAIL,
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateRemove, "params"),
  roomsController.remove,
);

module.exports = router;