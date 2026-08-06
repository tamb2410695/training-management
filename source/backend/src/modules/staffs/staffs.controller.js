const staffProfilesService = require("./staffs.service");
const userCreationService = require("../users/userCreation.service");
const { SUCCESS_CODES } = require("@/constants");
const { asyncHandler, successResponse } = require("@/utils/helpers");

const getList = asyncHandler(async (req, res, next) => {
  const result = await staffProfilesService.getList(req.query);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getById = asyncHandler(async (req, res, next) => {
  const result = await staffProfilesService.getById(req.params.id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const create = asyncHandler(async (req, res, next) => {
  const result = await userCreationService.createStaff(...req.body);
  return successResponse(res, result, SUCCESS_CODES.STAFF_PROFILE_CREATED, 201);
});

const update = asyncHandler(async (req, res, next) => {
  const result = await staffProfilesService.update(req.params.id, req.body);
  return successResponse(res, result, SUCCESS_CODES.STAFF_PROFILE_UPDATED);
});

const remove = asyncHandler(async (req, res, next) => {
  const result = await staffProfilesService.remove(req.params.id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_DELETE_SUCCESS);
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
