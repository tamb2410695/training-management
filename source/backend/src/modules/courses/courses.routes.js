const express = require("express");
const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");
const { authenticate, authorize } = require("../../middlewares");

// Giả định tầng middleware bọc validator tương tự như accounts
const {
  validateGetListMiddleware,
  validateGetByIdMiddleware,
  validateCreateMiddleware,
  validateUpdateMiddleware,
  validatePartialUpdateMiddleware,
  validateRemoveMiddleware,
} = require("../../middlewares/courses.middleware");

const coursesController = require("./courses.controller");

// =========================================================================
// 1. CÁC ROUTE CƠ BẢN (CRUD)
// =========================================================================

// Lấy danh sách khóa học & Tạo khóa học mới
router.get(
  ROUTES.COURSE.ROOT, 
  validateGetListMiddleware, 
  coursesController.getList
);

router.post(
  ROUTES.COURSE.ROOT, 
  validateCreateMiddleware, 
  coursesController.create
);

// Chi tiết khóa học, Cập nhật & Xóa mềm/Cứng khóa học
router.get(
  ROUTES.COURSE.DETAIL, 
  validateGetByIdMiddleware, 
  coursesController.getById
);

router.put(
  ROUTES.COURSE.DETAIL, 
  validateUpdateMiddleware, 
  coursesController.update
);

router.patch(
  ROUTES.COURSE.DETAIL, 
  validatePartialUpdateMiddleware, 
  coursesController.partialUpdate
);

router.delete(
  ROUTES.COURSE.DETAIL, 
  validateRemoveMiddleware, 
  coursesController.remove
);

// =========================================================================
// 2. CÁC ROUTE NGHIỆP VỤ / TÍNH NĂNG ĐẶC THÙ (STATE TRANSITION & SUB-RESOURCES)
// =========================================================================

// Chuyển trạng thái khóa học (Publish / Lock)
router.patch(
  ROUTES.COURSE.PUBLISH,
  validateGetByIdMiddleware, // Tái sử dụng để validate ID từ params hợp lệ
  coursesController.publish
);

router.patch(
  ROUTES.COURSE.LOCK,
  validateGetByIdMiddleware, 
  coursesController.lock
);

// Quản lý tài liệu đính kèm của khóa học (Sub-resource Documents)
router.get(
  ROUTES.COURSE.DOCUMENTS,
  validateGetByIdMiddleware,
  coursesController.getDocuments
);

module.exports = router;