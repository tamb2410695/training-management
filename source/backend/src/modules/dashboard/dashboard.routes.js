const express = require("express");
const router = express.Router();

const { ROUTES } = require("@/constants");

const dashboardController = require("./dashboard.controller");


router.get(
  ROUTES.DASHBOARD.ROOT,
  dashboardController.getDashboard,
);


router.get(
  ROUTES.DASHBOARD.OVERVIEW,
  dashboardController.getOverview,
);


router.get(
  ROUTES.DASHBOARD.STUDENTS,
  dashboardController.getStudentStatistics,
);


router.get(
  ROUTES.DASHBOARD.COURSES,
  dashboardController.getCourseStatistics,
);


router.get(
  ROUTES.DASHBOARD.CLASSES,
  dashboardController.getClassStatistics,
);


router.get(
  ROUTES.DASHBOARD.ENROLLMENTS,
  dashboardController.getEnrollmentStatistics,
);


router.get(
  ROUTES.DASHBOARD.DOCUMENTS,
  dashboardController.getRecentDocuments,
);


module.exports = router;