const { asyncHandler, successResponse } = require("../../utils/helpers");
const rolesService = require("./roles.service");

const getList = asyncHandler(async (req, res, next) => {
  const result = await rolesService.getList(req.query);
  return successResponse(res, result, "Get list of roles successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const result = await rolesService.getById(req.params.roleId);
  return successResponse(res, result, "Get role successful");
});

const create = asyncHandler(async (req, res, next) => {
  const result = await rolesService.create(req.body);
  return successResponse(res, result, "Create new role successful");
});

const update = asyncHandler(async (req, res, next) => {
  const result = await rolesService.update(req.params.roleId, req.body);
  return successResponse(res, result, "Update role successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const result = await rolesService.remove(req.params.roleId);
  return successResponse(res, result, "Delete role successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};