const express = require("express");
const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");
const { authenticate, authorize } = require("../../middlewares");
const upload = require("../../config");

const documentsController = require("./documents.controller");
const {
  createValidationMiddleware,
  createMultiValidator,
} = require("../../utils/helpers");

const {
  validateGetList,
  validateGetById,
  validateUpload,
  validateUpdate,
} = require("./documents.validator");

// router.use(authenticate);

router.get(
  ROUTES.DOCUMENT.ROOT,
  createValidationMiddleware(validateGetList, "query"),
  documentsController.getList,
);

// router.post(
//   ROUTES.DOCUMENT.ROOT,
//   authorize(ROLES.ADMIN, ROLES.INSTRUCTOR),
//   upload.single("file"),
//   createValidationMiddleware(validateCreate), 
//   documentsController.create,
// );

router.get(
  ROUTES.DOCUMENT.DETAIL,
  createValidationMiddleware(validateGetById, "params"),
  documentsController.getById,
);

router.patch(
  ROUTES.DOCUMENT.DETAIL,
  authorize(ROLES.ADMIN, ROLES.INSTRUCTOR),
  createMultiValidator(validateUpdate),
  documentsController.update,
);

// 5. Xóa mềm tài liệu
router.delete(
  ROUTES.DOCUMENT.DETAIL,
  authorize(ROLES.ADMIN, ROLES.INSTRUCTOR),
  createValidationMiddleware(validateGetById, "params"),
  documentsController.remove,
);

router.patch(
  `${ROUTES.DOCUMENT.DETAIL}/restore`,
  authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetById, "params"),
  documentsController.restore,
);

router.get(
  ROUTES.DOCUMENT.DOWNLOAD,
  createValidationMiddleware(validateGetById, "params"),
  documentsController.download,
);

module.exports = router;