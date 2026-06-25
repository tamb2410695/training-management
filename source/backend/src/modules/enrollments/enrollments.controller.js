const { asyncHandler, successResponse } = require("../../utils/helpers");
const enrollmentsService = require("./enrollments.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await enrollmentsService.getList(queryOptions);
  return successResponse(res, result, "Get list of enrollments successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const enrollmentId = req.params.id;
  const result = await enrollmentsService.getById(enrollmentId);
  return successResponse(res, result, "Get enrollment successful");
});

const create = asyncHandler(async (req, res, next) => {
  const { studentId, classId } = req.body;
  const result = await enrollmentsService.create({ studentId, classId });
  return successResponse(res, result, "Student enrolled successfully");
});

const update = asyncHandler(async (req, res, next) => {
  const enrollmentId = req.params.id;
  const { enrollmentStatus } = req.body;
  const result = await enrollmentsService.update(enrollmentId, enrollmentStatus);
  return successResponse(res, result, "Update enrollment status successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const enrollmentId = req.params.id;
  const result = await enrollmentsService.remove(enrollmentId);
  return successResponse(res, result, "Soft deleted enrollment successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};