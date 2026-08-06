export const API_ROUTES = {
  // Authentication
  AUTH: {
    REGISTER: "/auth/register",
    ACTIVATE: "/auth/activate",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    CHANGE_PASSWORD: "/auth/change-password",
    PROFILE: "/auth/me",
  },

  // Account
  ACCOUNT: {
    LIST: "/accounts",

    DETAIL: (id) => `/accounts/${id}`,

    LOCK: (id) => `/accounts/${id}/lock`,

    ACTIVATE: (id) => `/accounts/${id}/activate`,

    DISABLE: (id) => `/accounts/${id}/disable`,

    RESTORE: (id) => `/accounts/${id}/restore`,

    CHANGE_PASSWORD: (id) => `/accounts/${id}/change-password`,

    CHANGE_ROLE: (id) => `/accounts/${id}/change-role`,

    PROFILE: "/accounts/profile",
  },

  // Staff
  STAFF: {
    LIST: "/staffs",
    DETAIL: (id) => `/staffs/${id}`,
  },

  // Student
  STUDENT: {
    LIST: "/students",
    DETAIL: (id) => `/students/${id}`,
  },

  // Course Category
  COURSE_CATEGORY: {
    LIST: "/course-categories",
    DETAIL: (id) => `/course-categories/${id}`,
  },

  // Course
  COURSE: {
    LIST: "/courses",
    DETAIL: (id) => `/courses/${id}`,

    PUBLISH: (id) => `/courses/${id}/publish`,
    ARCHIVE: (id) => `/courses/${id}/archive`,

    DOCUMENTS: (id) => `/courses/${id}/documents`,
  },

  // Class
  CLASS: {
    LIST: "/classes",

    DETAIL: (id) => `/classes/${id}`,

    ASSIGN_INSTRUCTOR: (id) => `/classes/${id}/assign-instructor`,

    OPEN: (id) => `/classes/${id}/open`,

    START: (id) => `/classes/${id}/start`,

    COMPLETE: (id) => `/classes/${id}/complete`,

    CANCEL: (id) => `/classes/${id}/cancel`,

    CAPACITY: (id) => `/classes/${id}/capacity`,
  },

  // Registration
  REGISTRATION: {
    LIST: "/registrations",
    DETAIL: (id) => `/registrations/${id}`,

    APPROVE: (id) => `/registrations/${id}/approve`,

    REJECT: (id) => `/registrations/${id}/reject`,
  },

  // Enrollment
  ENROLLMENT: {
    LIST: "/enrollments",
    DETAIL: (id) => `/enrollments/${id}`,

    APPROVE: (id) => `/enrollments/${id}/approve`,

    REJECT: (id) => `/enrollments/${id}/reject`,
  },

  // Document
  DOCUMENT: {
    LIST: "/documents",
    UPLOAD: "/documents/upload",
    DETAIL: (id) => `/documents/${id}`,
    RESTORE: (id) => `/documents/${id}/restore`,
    DOWNLOAD: (id) => `/documents/${id}/download`,
  },

  // Dashboard
  DASHBOARD: {
    ROOT: "/dashboard",

    OVERVIEW: "/dashboard/overview",

    STUDENTS: "/dashboard/students",

    COURSES: "/dashboard/courses",

    CLASSES: "/dashboard/classes",

    ENROLLMENTS: "/dashboard/enrollments",

    DOCUMENTS: "/dashboard/documents",
  },
};
