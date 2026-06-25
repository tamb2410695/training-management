const express = require("express");
const router = express.Router();
const rolesController = require("./roles.controller");
const v = require("./roles.validator");

router.route("/")
  .get(v.validateQuery, rolesController.getList)
  .post(v.validateCreate, rolesController.create);

router.route("/:roleId")
  .get(v.validateId, rolesController.getById)
  .patch(v.validateId, v.validateUpdate, rolesController.update)
  .delete(v.validateId, rolesController.remove);

module.exports = router;