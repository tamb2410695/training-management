const express = require("express");

const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");
const accountsController = require("./accounts.controller");
const {
  createValidationMiddleware,
  createMultiValidator,
} = require("../../utils/helpers");
const {
  validateCreate,
  validateGetList,
  validateGetById,
  validateUpdate,
  validateRemove,
  validatePartialUpdate,
  validateStatusTransition,
} = require("./accounts.validator");

router.get(
  ROUTES.ACCOUNT.ROOT,
  createValidationMiddleware(validateGetList, "query"),
  accountsController.getList,
);

router.post(
  ROUTES.ACCOUNT.ROOT,
  createValidationMiddleware(validateCreate),
  accountsController.create,
);

router.get(
  ROUTES.ACCOUNT.DETAIL,
  createValidationMiddleware(validateGetById, "params"),
  accountsController.getById,
);

router.patch(
  ROUTES.ACCOUNT.DETAIL,
  createMultiValidator(validatePartialUpdate),
  accountsController.update,
);

// router.patch(
//   "/:id/restore",
//   accountsController.restore,
// );

router.delete(
  ROUTES.ACCOUNT.DETAIL,
  createValidationMiddleware(validateRemove, "params"),
  accountsController.remove,
);

router.patch(
  ROUTES.ACCOUNT.ACTIVATE,
  createValidationMiddleware(validateStatusTransition, "params"),
  accountsController.activate,
);

router.patch(
  ROUTES.ACCOUNT.LOCK,
  createValidationMiddleware(validateStatusTransition, "params"),
  accountsController.lock,
);
router.patch(
  ROUTES.ACCOUNT.DISABLE,
  createValidationMiddleware(validateStatusTransition, "params"),
  accountsController.disable,
);
router.patch(
  ROUTES.ACCOUNT.PENDING,
  createValidationMiddleware(validateStatusTransition, "params"),
  accountsController.pending,
);

module.exports = router;
