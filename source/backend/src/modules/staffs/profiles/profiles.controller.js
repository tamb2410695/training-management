const { SUCCESS_CODES } = require("../../../constants");
const { asyncHandler, successResponse } = require("../../../utils/helpers");
const staffProfilesService = require("./profiles.service");
const userCreationService = require("../../users/userCreation.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await staffProfilesService.getList(queryOptions);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await staffProfilesService.getById(id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const create = asyncHandler(async (req, res, next) => {
  const {accountData, profileData} = req.body
  const result = await userCreationService.createStaff(accountData, profileData);
  
  return successResponse(res, result, SUCCESS_CODES.STAFF_PROFILE_CREATED, undefined, 201);
});

const update = asyncHandler(async (req, res, next) => {
  const { staffId, staffData } = req.validatedData;
  const result = await staffProfilesService.update(staffId, staffData);
  return successResponse(res, result, SUCCESS_CODES.STAFF_PROFILE_UPDATED);
});

const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await staffProfilesService.remove(Number(id));
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_DELETE_SUCCESS);
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};