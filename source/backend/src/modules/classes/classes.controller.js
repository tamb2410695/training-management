const { asyncHandler, successResponse } = require("../../utils/helpers");

const classesService = require("./classes.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await classesService.getList(queryOptions);
  return successResponse(res, result, "Get list successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const classId = req.params.id;
  const result = await classesService.getById(classId);
  return successResponse(res, result, "Get class successful");
});

const create = asyncHandler(async (req, res, next) => {
  const { classData } = req.body;
  const result = await classesService.create(classData);
  return successResponse(res, result, "Create new class successful");
});

const update = asyncHandler(async (req, res, next) => {
  const classId = req.params.id;
  const { classData } = req.body;
  const result = await classesService.update(classId, classData);
  return successResponse(res, result, "Update class successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const classId = req.params.id;
  const result = await classesService.remove(classId);
  return successResponse(res, result, "Remove class successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
