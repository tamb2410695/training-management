const { asyncHandler, successResponse } = require("../../utils/helpers");

const instructorsService = require("./instructors.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await instructorsService.getList(queryOptions);
  return successResponse(res, result, "Get list successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const instructorId = req.params.id;
  const result = await instructorsService.getById(instructorId);
  return successResponse(res, result, "Get instructor successful");
});

const create = asyncHandler(async (req, res, next) => {
  const {accountData, instructorData} = req.body;
  const result = await instructorsService.create(accountData, instructorData);
  return successResponse(res, result, "Create new instructor successful");
});

const update = asyncHandler(async (req, res, next) => {
  const instructorId = req.params.id;
  const instructorData = req.body;
  const result = await instructorsService.update(instructorId, instructorData);
  return successResponse(res, result, "Update instructor successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const instructorId = req.params.id;
  const result = await instructorsService.remove(instructorId);
  return successResponse(res, result, "Remove instructor successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
