const { asyncHandler, successResponse } = require("../../utils/helpers");
const permissionsService = require("./permissions.service");

const getList = asyncHandler(async (req, res, next) => {
  const result = await permissionsService.getList(req.query);
  return successResponse(res, result, "Get list of permissions successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const result = await permissionsService.getById(req.params.permissionId);
  return successResponse(res, result, "Get permission successful");
});

const create = asyncHandler(async (req, res, next) => {
  const result = await permissionsService.create(req.body);
  return successResponse(res, result, "Create new permission successful");
});

const update = asyncHandler(async (req, res, next) => {
  const result = await permissionsService.update(req.params.permissionId, req.body);
  return successResponse(res, result, "Update permission successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const result = await permissionsService.remove(req.params.permissionId);
  return successResponse(res, result, "Delete permission successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};