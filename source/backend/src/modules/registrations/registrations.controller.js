const { asyncHandler, successResponse } = require("../../utils/helpers");
const registrationsService = require("./registrations.service");

// 1. Lấy thông tin đăng ký bằng mã Code (Dòng 16 trong file routes cần hàm này)
const getByCode = asyncHandler(async (req, res, next) => {
  const { code } = req.params;
  const result = await registrationsService.getByCode(code);
  return successResponse(res, result, "Get registration by code successful");
});

// 2. Lấy danh sách đăng ký (Có phân trang/lọc qua query)
const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await registrationsService.getList(queryOptions);
  return successResponse(res, result, "Get list of registrations successful");
});

// 3. Tạo mới một lượt đăng ký
const create = asyncHandler(async (req, res, next) => {
  const registrationData = req.body;
  const result = await registrationsService.create(registrationData);
  return successResponse(res, result, "Create new registration successful", 201);
});

// 4. Lấy chi tiết đăng ký bằng ID
const getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await registrationsService.getById(id);
  return successResponse(res, result, "Get registration detail successful");
});

// 5. Cập nhật thông tin đăng ký (Dùng chung cho cả PUT và PATCH)
const update = asyncHandler(async (req, res, next) => {
  // Lấy id từ params và dữ liệu đã validate từ middleware (nếu bạn gộp vào req.validatedData)
  // Nếu chưa gộp, bạn có thể đổi thành: const { id } = req.params; const registrationData = req.body;
  const { id, registrationData } = req.validatedData || { id: req.params.id, registrationData: req.body };
  
  const result = await registrationsService.update(id, registrationData);
  return successResponse(res, result, "Update registration successful");
});

// 6. Xóa lượt đăng ký
const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await registrationsService.remove(id);
  return successResponse(res, result, "Remove registration successful");
});

// Xuất bản tất cả các hàm để registrations.routes.js có thể require() đúng cách
module.exports = {
  getByCode,
  getList,
  create,
  getById,
  update,
  remove,
};
