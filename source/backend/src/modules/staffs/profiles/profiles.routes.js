const express = require("express");
const router = express.Router();

const { ROUTES } = require("../../../constants");
const staffProfilesController = require("./profiles.controller");
const { createValidationMiddleware, createMultiValidator } = require("../../../utils/helpers");
const {
  validateCreate,
  validateGetList,
  validateGetById,
  validateUpdate,
  validatePartialUpdate,
} = require("./profiles.validator");

/**
 * Lấy danh sách hồ sơ nhân sự kèm phân trang, tìm kiếm nâng cao
 * GET /profiles/
 */
router.get(
  ROUTES.STAFF?.ROOT || "/",
  createValidationMiddleware(validateGetList, "query"),
  staffProfilesController.getList,
);

/**
 * Khởi tạo một hồ sơ nhân sự mới
 * POST /profiles/
 */
router.post(
  ROUTES.STAFF?.ROOT || "/",
  createValidationMiddleware(validateCreate),
  staffProfilesController.create,
);

/**
 * Lấy thông tin chi tiết một nhân viên theo ID
 * GET /profiles/:id
 */
router.get(
  ROUTES.STAFF?.DETAIL || "/:id",
  createValidationMiddleware(validateGetById, "params"),
  staffProfilesController.getById,
);

/**
 * Cập nhật một phần thông tin nhân viên
 * PATCH /profiles/:id
 */
router.patch(
  ROUTES.STAFF?.DETAIL || "/:id",
  createMultiValidator(validatePartialUpdate),
  staffProfilesController.update,
);

/**
 * Cập nhật toàn bộ thông tin nhân viên
 * PUT /profiles/:id
 */
router.put(
  ROUTES.STAFF?.DETAIL || "/:id",
  createMultiValidator(validateUpdate),
  staffProfilesController.update,
);

/**
 * Xóa hoàn toàn một hồ sơ nhân sự (Hard Delete)
 * DELETE /profiles/:id
 */
router.delete(
  ROUTES.STAFF?.DETAIL || "/:id",
  createValidationMiddleware(validateGetById, "params"), // Tái sử dụng validate ID params giống hàm get detail
  staffProfilesController.remove,
);

module.exports = router;