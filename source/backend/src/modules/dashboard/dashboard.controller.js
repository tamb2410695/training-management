const { SUCCESS_CODES } = require("../../constants");
const { asyncHandler, successResponse } = require("../../utils/helpers");

const dashboardService = require("./dashboard.service");

const getDashboard = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getDashboard();

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getOverview = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getDashboardOverview();

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getStudentStatistics = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getStudentStatistics();

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getCourseStatistics = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getCourseStatistics();

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getClassStatistics = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getClassStatistics();

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getEnrollmentStatistics = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getEnrollmentStatistics();

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getClassEnrollmentOverview = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getClassEnrollmentOverview();

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getPopularCourses = asyncHandler(async (req, res, next) => {
  const result = await dashboardService.getPopularCourses();

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getRecentDocuments = asyncHandler(async (req, res, next) => {
  const { limit } = req.query;

  const result = await dashboardService.getRecentDocuments(limit);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

module.exports = {
  getDashboard,

  getOverview,

  getStudentStatistics,
  getCourseStatistics,
  getClassStatistics,
  getEnrollmentStatistics,

  getClassEnrollmentOverview,

  getPopularCourses,

  getRecentDocuments,
};
