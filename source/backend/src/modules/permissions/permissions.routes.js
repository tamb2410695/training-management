const express = require("express");
const router = express.Router();
const permissionsController = require("./permissions.controller");
const v = require("./permissions.validator");

router
  .route("/")
  .get(v.validateQuery, permissionsController.getList)
  .post(v.validateCreate, permissionsController.create);

router
  .route("/:permissionId")
  .get(v.validateId, permissionsController.getById)
  .patch(v.validateId, v.validateUpdate, permissionsController.update)
  .delete(v.validateId, permissionsController.remove);

module.exports = router;
