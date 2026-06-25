const dashboardRepository = require("./dashboard.repository");

const getOverview = async () => {
  return await dashboardRepository.getCounterOverview();
};

const getStudentStats = async () => {
  return await dashboardRepository.getStudentAnalytics();
};

const getCourseStats = async () => {
  return await dashboardRepository.getCourseAnalytics();
};

const getClassStats = async () => {
  return await dashboardRepository.getClassAnalytics();
};

const getPaymentStats = async () => {
  return await dashboardRepository.getPaymentAnalytics();
};

const getRevenueStats = async (period) => {
  let daysLimit = 30; // Mặc định 30 ngày qua
  
  if (period === "7_DAYS") daysLimit = 7;
  if (period === "30_DAYS" || period === "THIS_MONTH") daysLimit = 30;
  if (period === "THIS_YEAR") daysLimit = 365;

  return await dashboardRepository.getRevenueAnalytics(daysLimit);
};

const getEnrollmentStats = async () => {
  return await dashboardRepository.getEnrollmentAnalytics();
};

module.exports = {
  getOverview,
  getStudentStats,
  getCourseStats,
  getClassStats,
  getPaymentStats,
  getRevenueStats,
  getEnrollmentStats,
};