const express = require("express");

const router = express.Router();

const { ROUTES } = require("@/constants");

const accountsController = require("./accounts.controller");

const accountsMiddleware = require("./accounts.middleware");

const { createValidator, createMultiValidator } = require("@/utils/helpers");

// ===============================
// Query
// ===============================

router.get(
  ROUTES.ACCOUNT.ROOT,

  createValidator(accountsMiddleware.getList, "query"),

  accountsController.getList,
);

// ===============================
// CRUD
// ===============================

router.post(
  ROUTES.ACCOUNT.ROOT,

  createValidator(accountsMiddleware.create),

  accountsController.create,
);

router.get(
  ROUTES.ACCOUNT.DETAIL,

  createValidator(accountsMiddleware.getById, "params"),

  accountsController.getById,
);

router.patch(
  ROUTES.ACCOUNT.DETAIL,

  createMultiValidator(accountsMiddleware.partialUpdate),

  accountsController.update,
);

router.delete(
  ROUTES.ACCOUNT.DETAIL,

  createValidator(accountsMiddleware.remove, "params"),

  accountsController.remove,
);

// ===============================
// Business Actions
// ===============================

router.patch(
  ROUTES.ACCOUNT.LOCK,

  createValidator(accountsMiddleware.lock, "params"),

  accountsController.lock,
);

router.patch(
  ROUTES.ACCOUNT.ACTIVATE,

  createValidator(accountsMiddleware.activate, "params"),

  accountsController.activate,
);

router.patch(
  ROUTES.ACCOUNT.DISABLE,

  createValidator(accountsMiddleware.disable, "params"),

  accountsController.disable,
);

router.patch(
  ROUTES.ACCOUNT.RESTORE,

  createValidator(accountsMiddleware.restore, "params"),

  accountsController.restore,
);

router.patch(
  ROUTES.ACCOUNT.CHANGE_PASSWORD,

  createMultiValidator(accountsMiddleware.changePassword),

  accountsController.changePassword,
);

router.patch(
  ROUTES.ACCOUNT.CHANGE_ROLE,

  createMultiValidator(accountsMiddleware.changeRole),

  accountsController.changeRole,
);

module.exports = router;
