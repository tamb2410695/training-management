const express = require("express");
const router = express.Router();

const { ROUTES } = require("@/constants");
const staffProfilesController = require("./staffs.controller");
const { createValidator, createMultiValidator } = require("@/utils/helpers");
const staffProfilesMiddleware = require("./staffs.middleware");

router.get(
  ROUTES.STAFF.ROOT,
  createValidator(staffProfilesMiddleware.getList, "query"),
  staffProfilesController.getList,
);

router.post(
  ROUTES.STAFF.ROOT,
  createValidator(staffProfilesMiddleware.create),
  staffProfilesController.create,
);

router.get(
  ROUTES.STAFF.DETAIL,
  createValidator(staffProfilesMiddleware.getById, "params"),
  staffProfilesController.getById,
);

router.patch(
  ROUTES.STAFF.DETAIL,
  createMultiValidator(staffProfilesMiddleware.partialUpdate),
  staffProfilesController.update,
);

router.delete(
  ROUTES.STAFF.DETAIL,
  createValidator(staffProfilesMiddleware.getById, "params"),
  staffProfilesController.remove,
);

module.exports = router;