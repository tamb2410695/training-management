const dashboardRepository = require("./dashboard.repository");

const getDashboardOverview = async () => {
  const overview = await dashboardRepository.getOverview();
  return overview;
};

const getStudentStatistics = async () => {
  const statistics = await dashboardRepository.getStudentStatistics();
  return statistics;
};

const getCourseStatistics = async () => {
  const statistics = await dashboardRepository.getCourseStatistics();
  return statistics;
};

const getClassStatistics = async () => {
  const statistics = await dashboardRepository.getClassStatistics();
  return statistics;
};

const getEnrollmentStatistics = async () => {
  const statistics = await dashboardRepository.getEnrollmentStatistics();
  return statistics;
};

const getClassEnrollmentOverview = async () => {
  const data = await dashboardRepository.getClassEnrollmentOverview();
  return data;
};

const getPopularCourses = async () => {
  const courses = await dashboardRepository.getPopularCourses();
  return courses;
};

const getRecentDocuments = async (limit) => {
  const documents = await dashboardRepository.getRecentDocuments(limit);
  return documents;
};

const getDashboard = async () => {
  const [
    overview,
    studentStatistics,
    courseStatistics,
    classStatistics,
    enrollmentStatistics,
    classEnrollmentOverview,
    popularCourses,
    recentDocuments,
  ] = await Promise.all([
    dashboardRepository.getOverview(),
    dashboardRepository.getStudentStatistics(),
    dashboardRepository.getCourseStatistics(),
    dashboardRepository.getClassStatistics(),
    dashboardRepository.getEnrollmentStatistics(),
    dashboardRepository.getClassEnrollmentOverview(),
    dashboardRepository.getPopularCourses(),
    dashboardRepository.getRecentDocuments(),
  ]);

  return {
    overview,
    statistics: {
      students: studentStatistics,
      courses: courseStatistics,
      classes: classStatistics,
      enrollments: enrollmentStatistics,
    },

    classEnrollmentOverview,
    popularCourses,
    recentDocuments,
  };
};

module.exports = {
  getDashboardOverview,

  getStudentStatistics,
  getCourseStatistics,
  getClassStatistics,
  getEnrollmentStatistics,

  getClassEnrollmentOverview,
  getPopularCourses,
  getRecentDocuments,

  getDashboard,
};
