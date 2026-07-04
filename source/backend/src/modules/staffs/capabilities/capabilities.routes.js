const express = require("express");
const router = express.Router();

const {ROUTES} = require("../../../constants");

const staffCapabilitiesController = require("./capabilities.controller");
const { createValidationMiddleware } = require("../../../utils/helpers");
const { validateGetList, validateCreate } = require("./capabilities.validator");

/**
 * Lấy danh sách năng lực giảng dạy toàn trường (Phân trang, lọc theo giảng viên hoặc môn)
 * GET /staff-capabilities/
 */
router.get(
  ROUTES.STAFF_CAPABILITY.ROOT,
  createValidationMiddleware(validateGetList, "query"),
  staffCapabilitiesController.getList,
);

/**
 * Gán quyền/Năng lực giảng dạy một môn học cho giảng viên
 * POST /staff-capabilities/assign
 */
router.post(
  ROUTES.STAFF_CAPABILITY.ASSIGN || "/assign",
  createValidationMiddleware(validateCreate),
  staffCapabilitiesController.create,
);

/**
 * Lấy chi tiết thông tin gán năng lực của một giảng viên với một môn học cụ thể
 * GET /staff-capabilities/staff/:staffId/course/:courseId
 */
router.get(
  "/staff/:staffId/course/:courseId",
  staffCapabilitiesController.getByCompositeKey,
);

/**
 * Hủy gán năng lực giảng dạy (Xóa quyền dạy môn học đó)
 * DELETE /staff-capabilities/staff/:staffId/course/:courseId
 */
router.delete(
  ROUTES.STAFF_CAPABILITY.REMOVE || "/staff/:staffId/course/:courseId",
  staffCapabilitiesController.remove,
);

module.exports = router;