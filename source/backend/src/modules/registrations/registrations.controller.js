const { SUCCESS_CODES } = require("../../constants");
const { asyncHandler, successResponse } = require("../../utils/helpers");
const registrationsService = require("./registrations.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await registrationsService.getList(queryOptions);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getById = asyncHandler(async (req, res, next) => {
  const id = req.params;
  const result = await registrationsService.getById(id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const create = asyncHandler(async (req, res, next) => {
  const registrationData = req.body;
  const result = await registrationsService.create(registrationData);
  return successResponse(res, result, SUCCESS_CODES.STUDENT_REGISTRATION_SUBMITTED, 211);
});

const update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const registrationData = req.body;
  const result = await registrationsService.update(id, registrationData);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_UPDATE_SUCCESS);
});

const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await registrationsService.remove(id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_DELETE_SUCCESS);
});

const activate = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await registrationsService.activate(id, req.body);
  return successResponse(res, result, SUCCESS_CODES.STUDENT_REGISTRATION_APPROVED);
});

module.exports = {
  getList,
  create,
  getById,
  update,
  remove,
  activate,
};