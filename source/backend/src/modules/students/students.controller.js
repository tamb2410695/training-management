const { SUCCESS_CODES } = require("../../constants");
const { asyncHandler, successResponse } = require("../../utils/helpers");
const studentsService = require("./students.service");
const userCreationService = require("../users/userCreation.service");

const getList = asyncHandler(async (req, res, next) => {
  const result = await studentsService.getList(req.query);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getById = asyncHandler(async (req, res, next) => {
  const result = await studentsService.getById(req.params.id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const create = asyncHandler(async (req, res, next) => {
  const result = await userCreationService.createStudent(...req.body);
  return successResponse(
    res,
    result,
    SUCCESS_CODES.STUDENT_REGISTRATION_APPROVED,
    201,
  );
});

const update = asyncHandler(async (req, res, next) => {
  const result = await studentsService.update(req.params.id, req.body);
  return successResponse(res, result, SUCCESS_CODES.STUDENT_PROFILE_UPDATED);
});

const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await studentsService.remove(id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_DELETE_SUCCESS);
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
