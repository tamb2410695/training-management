const { asyncHandler, successResponse } = require("../../utils/helpers");
const studentsService = require("./students.service");

/**
 * Lấy danh sách hồ sơ sinh viên có phân trang, tìm kiếm và lọc nâng cao
 */
const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await studentsService.getList(queryOptions);
  return successResponse(res, result, "Get list of student profiles successful");
});

/**
 * Lấy chi tiết hồ sơ sinh viên theo ID
 */
const getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await studentsService.getById(Number(id));
  return successResponse(res, result, "Get student profile detail successful");
});

/**
 * Khởi tạo hồ sơ sinh viên mới
 */
const create = asyncHandler(async (req, res, next) => {
  const studentData = req.body;
  const result = await studentsService.create(studentData);
  return successResponse(res, result, "Create new student profile successful");
});

/**
 * Cập nhật thông tin hồ sơ sinh viên (PUT/PATCH)
 */
const update = asyncHandler(async (req, res, next) => {
  const { studentId, studentData } = req.validatedData;
  const result = await studentsService.update(studentId, studentData);
  return successResponse(res, result, "Update student profile successful");
});

/**
 * Xóa hồ sơ sinh viên (Soft Delete account + Đổi trạng thái học tập)
 */
const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await studentsService.remove(Number(id));
  return successResponse(res, result, "Remove student profile successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};