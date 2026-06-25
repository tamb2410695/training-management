const { asyncHandler, successResponse } = require("../../utils/helpers");
const dashboardService = require("./dashboard.service");

const getOverview = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getOverview();
  return successResponse(res, result, "Get overview statistics successful");
});

const getStudentStats = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getStudentStats();
  return successResponse(res, result, "Get student statistics successful");
});

const getCourseStats = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getCourseStats();
  return successResponse(res, result, "Get course statistics successful");
});

const getClassStats = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getClassStats();
  return successResponse(res, result, "Get class statistics successful");
});

const getPaymentStats = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getPaymentStats();
  return successResponse(res, result, "Get payment statistics successful");
} );

const getRevenueStats = asyncHandler(async (req, res, next) => {
  const { period } = req.query;
  const result = await dashboardService.getRevenueStats(period || "30_DAYS");
  return successResponse(res, result, "Get revenue statistics successful");
});

const getEnrollmentStats = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getEnrollmentStats();
  return successResponse(res, result, "Get enrollment statistics successful");
});

module.exports = {
  getOverview,
  getStudentStats,
  getCourseStats,
  getClassStats,
  getPaymentStats,
  getRevenueStats,
  getEnrollmentStats,
};