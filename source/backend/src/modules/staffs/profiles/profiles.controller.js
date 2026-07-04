const { asyncHandler, successResponse } = require("../../../utils/helpers");
const staffProfilesService = require("./profiles.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await staffProfilesService.getList(queryOptions);
  return successResponse(res, result, "Get list of staff profiles successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await staffProfilesService.getById(Number(id));
  return successResponse(res, result, "Get staff profile detail successful");
});

const create = asyncHandler(async (req, res, next) => {
  const staffData = req.body;
  const result = await staffProfilesService.create(staffData);
  return successResponse(res, result, "Create new staff profile successful");
});

const update = asyncHandler(async (req, res, next) => {
  const { staffId, staffData } = req.validatedData;
  const result = await staffProfilesService.update(staffId, staffData);
  return successResponse(res, result, "Update staff profile successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await staffProfilesService.remove(Number(id));
  return successResponse(res, result, "Remove staff profile successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};