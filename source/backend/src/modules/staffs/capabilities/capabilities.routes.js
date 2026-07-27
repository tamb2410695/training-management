const express = require("express");
const router = express.Router();

const {ROUTES} = require("../../../constants");

const staffCapabilitiesController = require("./capabilities.controller");
const { createValidationMiddleware } = require("../../../utils/helpers");
const { validateGetList, validateCreate } = require("./capabilities.validator");

router.get(
  ROUTES.STAFF_CAPABILITY.ROOT,
  createValidationMiddleware(validateGetList, "query"),
  staffCapabilitiesController.getList,
);

router.post(
  ROUTES.STAFF_CAPABILITY.ASSIGN,
  createValidationMiddleware(validateCreate),
  staffCapabilitiesController.create,
);

router.get(
  "/staff/:staffId/course/:courseId",
  staffCapabilitiesController.getByCompositeKey,
);

router.delete(
  ROUTES.STAFF_CAPABILITY.REMOVE,
  staffCapabilitiesController.remove,
);

module.exports = router;