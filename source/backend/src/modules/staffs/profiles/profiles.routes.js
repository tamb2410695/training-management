const express = require("express");
const router = express.Router();

const { ROUTES } = require("../../../constants");
const staffProfilesController = require("./profiles.controller");
const { createValidationMiddleware, createMultiValidator } = require("../../../utils/helpers");
const {
  validateCreate,
  validateGetList,
  validateGetById,
  validateUpdate,
  validatePartialUpdate,
} = require("./profiles.validator");

router.get(
  ROUTES.STAFF?.ROOT,
  createValidationMiddleware(validateGetList, "query"),
  staffProfilesController.getList,
);

router.post(
  ROUTES.STAFF?.ROOT,
  createValidationMiddleware(validateCreate),
  staffProfilesController.create,
);

router.get(
  ROUTES.STAFF?.DETAIL,
  createValidationMiddleware(validateGetById, "params"),
  staffProfilesController.getById,
);

router.patch(
  ROUTES.STAFF?.DETAIL,
  createMultiValidator(validatePartialUpdate),
  staffProfilesController.update,
);

router.put(
  ROUTES.STAFF?.DETAIL,
  createMultiValidator(validateUpdate),
  staffProfilesController.update,
);

router.delete(
  ROUTES.STAFF?.DETAIL,
  createValidationMiddleware(validateGetById, "params"),
  staffProfilesController.remove,
);

module.exports = router;