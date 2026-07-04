const express = require("express");
const router = express.Router();

const { ROLES } = require("../../constants");
const { authenticate, authorize } = require("../../middlewares");

const roomsController = require("./rooms.controller");
const { 
  validateGetList, 
  validateGetById, 
  validateCreate, 
  validateUpdate, 
  validatePartialUpdate, 
  validateRemove,
  validateAvailability // Thêm validator kiểm tra lịch trống
} = require("./rooms.validator");

const {
  createValidationMiddleware,
} = require("../../utils/helpers/validators/middlewareHelper");

// =========================================================================
// ROUTING FOR ROOM MODULE (ROOM_ROUTES)
// =========================================================================

// 1. LẤY DANH SÁCH PHÒNG HỌC (GET /)
router.get(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetList, "query"),
  roomsController.getList,
);

// 2. KIỂM TRA LỊCH TRỐNG/KHẢ DỤNG CỦA PHÒNG (GET /:id/availability)
// Route này phải đặt TRƯỚC /:id để tránh trùng khớp pattern định tuyến (Route Conflict)
router.get(
  "/:id/availability",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateAvailability, "query"), // Query thường chứa date, startTime, endTime
  roomsController.getAvailability,
);

// 3. LẤY CHI TIẾT PHÒNG HỌC THEO ID (GET /:id)
router.get(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateGetById, "params"),
  roomsController.getById,
);

// 4. TẠO PHÒNG HỌC MỚI (POST /)
router.post(
  "/",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateCreate, "body"),
  roomsController.create,
);

// 5. CẬP NHẬT TOÀN BỘ PHÒNG HỌC (PUT /:id)
router.put(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateUpdate, "body"),
  roomsController.update,
);

// 6. CẬP NHẬT MỘT PHẦN PHÒNG HỌC (PATCH /:id)
router.patch(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validatePartialUpdate, "body"),
  roomsController.update,
);

// 7. XÓA PHÒNG HỌC (DELETE /:id)
router.delete(
  "/:id",
  // authenticate,
  // authorize(ROLES.ADMIN),
  createValidationMiddleware(validateRemove, "params"),
  roomsController.remove,
);

module.exports = router;