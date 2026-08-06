const { SUCCESS_CODES } = require("@/constants");

const { asyncHandler, successResponse } = require("@/utils/helpers");

const coursesService = require("./courses.service");

// ===============================
// Query
// ===============================

const getList = asyncHandler(async (req, res) => {
  const result = await coursesService.getList(req.query);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getById = asyncHandler(async (req, res) => {
  const result = await coursesService.getById(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

// ===============================
// CRUD
// ===============================

const create = asyncHandler(async (req, res) => {
  const result = await coursesService.create(req.body);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_CREATE_SUCCESS);
});

const update = asyncHandler(async (req, res) => {
  const result = await coursesService.update(req.params.id, req.body);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_UPDATE_SUCCESS);
});

const remove = asyncHandler(async (req, res) => {
  const result = await coursesService.remove(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_DELETE_SUCCESS);
});

// ===============================
// Business Actions
// ===============================

const publish = asyncHandler(async (req, res) => {
  const result = await coursesService.publish(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.COURSE_PUBLISHED);
});

const archive = asyncHandler(async (req, res) => {
  const result = await coursesService.archive(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.COURSE_ARCHIVED);
});

module.exports = {
  getList,
  getById,

  create,
  update,
  remove,

  publish,
  archive,
};
