const express = require("express");

const router = express.Router();

const { ROUTES } = require("@/constants");

const { createValidator, createMultiValidator } = require("@/utils/helpers");

const { authenticate } = require("@/middlewares/auth.middleware");

const { authorize } = require("@/middlewares/role.middleware");

const documentsController = require("./documents.controller");

const documentsMiddleware = require("./documents.middleware");

// ===============================
// Query
// ===============================

router.get(
  ROUTES.DOCUMENT.ROOT,

  // authenticate,

  // authorize(
  //   "ADMIN",
  //   "STAFF",
  //   "STUDENT",
  // ),

  createValidator(documentsMiddleware.getList, "query"),

  documentsController.getList,
);

// ===============================
// Detail
// ===============================

router.get(
  ROUTES.DOCUMENT.DETAIL,

  // authenticate,

  // authorize(
  //   "ADMIN",
  //   "STAFF",
  //   "STUDENT",
  // ),

  createValidator(documentsMiddleware.getById, "params"),

  documentsController.getById,
);

// ===============================
// Upload
// ===============================

router.post(
  ROUTES.DOCUMENT.UPLOAD,

  // authenticate,

  // authorize(
  //   "ADMIN",
  //   "STAFF",
  // ),

  documentsMiddleware.uploadSingleDocument,

  createValidator(documentsMiddleware.uploadDocument, "body"),

  documentsController.upload,
);

// ===============================
// Update
// ===============================

router.patch(
  ROUTES.DOCUMENT.DETAIL,

  // authenticate,

  // authorize(
  //   "ADMIN",
  //   "STAFF",
  // ),

  createMultiValidator(documentsMiddleware.partialUpdate),

  documentsController.update,
);

// ===============================
// Delete
// ===============================

router.delete(
  ROUTES.DOCUMENT.DETAIL,

  // authenticate,

  // authorize(
  //   "ADMIN",
  //   "STAFF",
  // ),

  createValidator(documentsMiddleware.getById, "params"),

  documentsController.remove,
);

// ===============================
// Restore
// ===============================

router.patch(
  ROUTES.DOCUMENT.RESTORE,

  // authenticate,

  // authorize(
  //   "ADMIN",
  // ),

  createValidator(documentsMiddleware.getById, "params"),

  documentsController.restore,
);

// ===============================
// Download
// ===============================

router.get(
  ROUTES.DOCUMENT.DOWNLOAD,

  // authenticate,

  // authorize(
  //   "ADMIN",
  //   "STAFF",
  //   "STUDENT",
  // ),

  createValidator(documentsMiddleware.getById, "params"),

  documentsController.download,
);

module.exports = router;
