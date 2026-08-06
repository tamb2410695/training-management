const express = require("express");
const router = express.Router();

const { ROUTES } = require("@/constants");
const {
  createValidator,
  createMultiValidator,
} = require("@/utils/helpers");

const studentProfilesController = require("./students.controller")
const studentProfilesMiddleware = require("./students.middleware");

router.get(
  ROUTES.STUDENT.ROOT,
  createValidator(studentProfilesMiddleware.getList, "query"),
  studentProfilesController.getList,
);

router.post(
  ROUTES.STUDENT.ROOT,
  createValidator(studentProfilesMiddleware.create),
  studentProfilesController.create,
);

router.get(
  ROUTES.STUDENT.DETAIL,
  createValidator(studentProfilesMiddleware.getById, "params"),
  studentProfilesController.getById,
);

router.patch(
  ROUTES.STUDENT.DETAIL,
  createMultiValidator(studentProfilesMiddleware.partialUpdate),
  studentProfilesController.update,
);

router.delete(
  ROUTES.STUDENT.DETAIL,
  createValidator(studentProfilesMiddleware.getById, "params"),
  studentProfilesController.remove,
);

module.exports = router;
