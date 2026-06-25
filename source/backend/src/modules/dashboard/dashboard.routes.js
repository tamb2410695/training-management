const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboard.controller");
const v = require("./dashboard.validator");

// Tất cả đều là phương thức GET phục vụ xuất báo cáo/hiển thị biểu đồ
router.get("/overview", dashboardController.getOverview);
router.get("/students", dashboardController.getStudentStats);
router.get("/courses", dashboardController.getCourseStats);
router.get("/classes", dashboardController.getClassStats);
router.get("/payments", dashboardController.getPaymentStats);
router.get("/revenue", v.validateOverviewQuery, dashboardController.getRevenueStats);
router.get("/enrollments", dashboardController.getEnrollmentStats);

module.exports = router;