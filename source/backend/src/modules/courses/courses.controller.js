const { asyncHandler, successResponse } = require("../../utils/helpers");
const coursesService = require("./courses.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await coursesService.getList(queryOptions);
  return successResponse(res, result, "Get list of courses successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const result = await coursesService.getById(courseId);
  return successResponse(res, result, "Get course details successful");
});

const create = asyncHandler(async (req, res, next) => {
  const courseData = req.body;
  const result = await coursesService.create(courseData);
  return successResponse(res, result, "Create new course successful");
});

const update = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const courseData = req.body;
  const result = await coursesService.update(courseId, courseData);
  return successResponse(res, result, "Update course successful");
});

const partialUpdate = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const courseData = req.body;
  const result = await coursesService.partialUpdate(courseId, courseData);
  return successResponse(res, result, "Partially update course successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const result = await coursesService.remove(courseId);
  return successResponse(res, result, "Remove course successful");
});

const publish = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  // Gọi service cập nhật trạng thái course sang 'ACTIVE'
  const result = await coursesService.updateStatus(courseId, "ACTIVE");
  return successResponse(res, result, "Course published successfully");
});

const lock = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  // Gọi service cập nhật trạng thái course sang 'LOCKED'
  const result = await coursesService.updateStatus(courseId, "LOCKED");
  return successResponse(res, result, "Course locked successfully");
});

const getDocuments = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  // Lấy danh sách tài liệu thuộc về khóa học cụ thể này (Sub-resource)
  const result = await coursesService.getDocumentsByCourseId(courseId);
  return successResponse(res, result, "Get course documents successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  partialUpdate,
  remove,
  publish,
  lock,
  getDocuments,
};