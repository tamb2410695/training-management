import api from "@/services/api";
import { API_ROUTES } from "@/constants";

const API = API_ROUTES.DASHBOARD;

export default function dashboardService() {
  return {
    getDashboard: () => api.get(API.ROOT),

    getOverview: () => api.get(API.OVERVIEW),

    getStudentStatistics: () => api.get(API.STUDENTS),

    getCourseStatistics: () => api.get(API.COURSES),

    getClassStatistics: () => api.get(API.CLASSES),

    getEnrollmentStatistics: () => api.get(API.ENROLLMENTS),

    getRecentDocuments: () => api.get(API.DOCUMENTS),
  };
}
