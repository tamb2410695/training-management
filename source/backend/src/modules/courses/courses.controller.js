const { asyncHandler, successResponse } = require("../../utils/helpers");

const coursesService = require("./courses.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await coursesService.getList(queryOptions);
  return successResponse(res, result, "Get list successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const result = await coursesService.getById(courseId);
  return successResponse(res, result, "Get course successful");
});

const create = asyncHandler(async (req, res, next) => {
  const { courseData } = req.body;
  const result = await coursesService.create(courseData);
  return successResponse(res, result, "Create new course successful");
});

const update = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const { courseData } = req.body;
  const result = await coursesService.update(courseId, courseData);
  return successResponse(res, result, "Update course successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const result = await coursesService.remove(courseId);
  return successResponse(res, result, "Remove course successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
