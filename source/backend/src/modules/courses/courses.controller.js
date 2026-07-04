const { asyncHandler, successResponse } = require("../../utils/helpers");
const coursesService = require("./courses.service");

// =========================================================================
// 1. CÁC TÁC VỤ CRUD CƠ BẢN
// =========================================================================

const getList = asyncHandler(async (req, res, next) => {
  // Nhận queryOptions đã qua validate và format ở middleware
  const queryOptions = req.validatedQuery || req.query;
  const result = await coursesService.getList(queryOptions);
  return successResponse(res, result, "Get list of courses successful");
});

const getById = asyncHandler(async (req, res, next) => {
  // Nhận courseId đã qua format và validate thành dạng số
  const courseId = req.validatedParams?.id || req.params.id;
  const result = await coursesService.getById(courseId);
  return successResponse(res, result, "Get course details successful");
});

const create = asyncHandler(async (req, res, next) => {
  // Nhận dữ liệu body sạch đã qua sanitize và format lý tưởng
  const courseData = req.validatedBody || req.body;
  const result = await coursesService.create(courseData);
  return successResponse(res, result, "Create new course successful");
});

const update = asyncHandler(async (req, res, next) => {
  // PUT: Thay đổi toàn bộ / cập nhật đầy đủ các trường cho phép
  const courseId = req.validatedParams?.id || req.params.id;
  const courseData = req.validatedBody || req.body;
  const result = await coursesService.update(courseId, courseData);
  return successResponse(res, result, "Update course successful");
});

const partialUpdate = asyncHandler(async (req, res, next) => {
  // PATCH: Thay đổi một vài trường (Cập nhật một phần)
  const courseId = req.validatedParams?.id || req.params.id;
  const courseData = req.validatedBody || req.body;
  const result = await coursesService.partialUpdate(courseId, courseData);
  return successResponse(res, result, "Partially update course successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const courseId = req.validatedParams?.id || req.params.id;
  const result = await coursesService.remove(courseId);
  return successResponse(res, result, "Remove course successful");
});

// =========================================================================
// 2. CÁC TÁC VỤ THAY ĐỔI TRẠNG THÁI & SUB-RESOURCE
// =========================================================================

const publish = asyncHandler(async (req, res, next) => {
  const courseId = req.validatedParams?.id || req.params.id;
  // Gọi service cập nhật trạng thái course sang 'ACTIVE'
  const result = await coursesService.updateStatus(courseId, "ACTIVE");
  return successResponse(res, result, "Course published successfully");
});

const lock = asyncHandler(async (req, res, next) => {
  const courseId = req.validatedParams?.id || req.params.id;
  // Gọi service cập nhật trạng thái course sang 'LOCKED'
  const result = await coursesService.updateStatus(courseId, "LOCKED");
  return successResponse(res, result, "Course locked successfully");
});

const getDocuments = asyncHandler(async (req, res, next) => {
  const courseId = req.validatedParams?.id || req.params.id;
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