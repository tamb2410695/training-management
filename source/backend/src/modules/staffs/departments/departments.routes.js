const express = require("express");
const router = express.Router();

const { ROUTES } = require("../../../constants");
const staffDepartmentsController = require("./departments.controller");

const {
  createValidationMiddleware,
  createMultiValidator,
} = require("../../../utils/helpers");

// Giả định các hàm validate tương ứng trong file validator cùng thư mục
const {
  validateGetList,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
} = require("./departments.validator");

/**
 * Lấy danh sách lịch sử điều động toàn hệ thống
 * GET /staff-departments/
 */
router.get(
  ROUTES.STAFF_DEPARTMENT.ROOT,
  createValidationMiddleware(validateGetList, "query"),
  staffDepartmentsController.getList,
);

/**
 * Điều động nhân sự vào phòng ban mới
 * POST /staff-departments/assign
 */
router.post(
  ROUTES.STAFF_DEPARTMENT.ASSIGN,
  createValidationMiddleware(validateCreate),
  staffDepartmentsController.assign,
);

/**
 * Lấy chi tiết thông tin bổ nhiệm của một cặp (staffId, departmentId) cụ thể
 * GET /staff-departments/staff/:staffId/department/:departmentId
 */
router.get(
  "/staff/:staffId/department/:departmentId",
  staffDepartmentsController.getByCompositeKey,
);

/**
 * Cập nhật thông tin điều động của nhân sự
 * PATCH hoặc PUT /staff-departments/staff/:staffId/department/:departmentId
 */
router.patch(
  "/staff/:staffId/department/:departmentId",
  createMultiValidator(validatePartialUpdate),
  staffDepartmentsController.updateAssignment,
);

router.put(
  "/staff/:staffId/department/:departmentId",
  createMultiValidator(validateUpdate),
  staffDepartmentsController.updateAssignment,
);

/**
 * Bãi nhiệm nhân sự khỏi phòng ban (Xóa mối liên kết vật lý)
 * DELETE /staff-departments/staff/:staffId/department/:departmentId
 */
router.delete(
  ROUTES.STAFF_DEPARTMENT.REMOVE,
  staffDepartmentsController.remove,
);

module.exports = router;