export const API_ROUTES = {
  // 1. AUTHENTICATION & TOKEN METRICS
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    CHANGE_PASSWORD: "/auth/change-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    PROFILE: "/auth/me",
  },

  // 2. ROLE & ACCOUNT MANAGEMENT
  ROLE: {
    LIST: "/roles",
    DETAIL: (id) => `/roles/${id}`,
  },
  ACCOUNT: {
    LIST: "/accounts",
    DETAIL: (id) => `/accounts/${id}`,
    PENDING: (id) => `/accounts/${id}/pending`,
    ACTIVATE: (id) => `/accounts/${id}/activate`,
    LOCK: (id) => `/accounts/${id}/lock`,
    DISABLE: (id) => `/accounts/${id}/disable`,
    DELETE: (id) => `/accounts/${id}/delete`,
    PROFILE: "/accounts/profile",
  },

  // 3. STAFF & DEPARTMENT
  DEPARTMENT: {
    LIST: "/departments",
    DETAIL: (id) => `/departments/${id}`,
    STAFFS: (id) => `/departments/${id}/staffs`,
  },
  STAFF_PROFILE: {
    LIST: "/staffs/profiles",
    DETAIL: (id) => `/staffs/profiles/${id}`,
  },
  STAFF_DEPARTMENT: {
    LIST: "/staffs/departments",
    ASSIGN: "/staffs/departments/assign",
    REMOVE: (staffId, departmentId) => `/staffs/departments/staff/${staffId}/department/${departmentId}`,
  },
  STAFF_CAPABILITY: {
    LIST: "/staffs/capabilities",
    ASSIGN: "/staffs/capabilities/assign",
    REMOVE: (staffId, courseId) => `/staffs/capabilities/staff/${staffId}/course/${courseId}`,
  },

  // 4. COURSE & DOCUMENT
  COURSE: {
    LIST: "/courses",
    DETAIL: (id) => `/courses/${id}`,
    DOCUMENTS: (id) => `/courses/${id}/documents`,
    PUBLISH: (id) => `/courses/${id}/publish`,
    LOCK: (id) => `/courses/${id}/lock`,
  },
  DOCUMENT: {
    LIST: "/documents",
    DETAIL: (id) => `/documents/${id}`,
    DOWNLOAD: (id) => `/documents/${id}/download`,
  },

  // 5. CLASS, ROOM & SCHEDULE
  CLASS: {
    LIST: "/classes",
    DETAIL: (id) => `/classes/${id}`,
    SCHEDULES: (id) => `/classes/${id}/schedules`,
    OPEN_REGISTRATION: (id) => `/classes/${id}/open-registration`,
    CLOSE_REGISTRATION: (id) => `/classes/${id}/close-registration`,
    START: (id) => `/classes/${id}/start`,
    COMPLETE: (id) => `/classes/${id}/complete`,
  },
  ROOM: {
    LIST: "/rooms",
    DETAIL: (id) => `/rooms/${id}`,
    AVAILABILITY: (id) => `/rooms/${id}/availability`,
  },
  SCHEDULE: {
    LIST: "/schedules",
    DETAIL: (id) => `/schedules/${id}`,
    ATTENDANCE: (id) => `/schedules/${id}/attendance`,
  },

  // 6. REGISTRATION & STUDENT
  REGISTRATION: {
    LIST: "/registrations",
    DETAIL: (id) => `/registrations/${id}`,
    APPROVE: (id) => `/registrations/${id}/approve`,
    REJECT: (id) => `/registrations/${id}/reject`,
    ACTIVATE: (id) => `/registrations/${id}/activate`,
  },
  STUDENT: {
    LIST: "/students",
    DETAIL: (id) => `/students/${id}`,
    TRANSCRIPT: (id) => `/students/${id}/transcript`,
    CERTIFICATES: (id) => `/students/${id}/certificates`,
    ATTENDANCES: (id) => `/students/${id}/attendances`,
  },

  // 7. ENROLLMENT & FINANCE
  ENROLLMENT: {
    LIST: "/enrollments",
    DETAIL: (id) => `/enrollments/${id}`,
    CONFIRM: (id) => `/enrollments/${id}/confirm`,
    CANCEL: (id) => `/enrollments/${id}/cancel`,
    REFUND: (id) => `/enrollments/${id}/refund`,
  },
  PAYMENT: {
    LIST: "/payments",
    DETAIL: (id) => `/payments/${id}`,
    CONFIRM: (id) => `/payments/${id}/confirm`,
    REFUND: (id) => `/payments/${id}/refund`,
  },

  // 8. ACADEMIC PERFORMANCE
  ATTENDANCE: {
    LIST: "/attendances",
    DETAIL: (id) => `/attendances/${id}`,
  },
  GRADE: {
    LIST: "/grades",
    DETAIL: (id) => `/grades/${id}`,
    PUBLISH: (id) => `/grades/${id}/publish`,
    LOCK: (id) => `/grades/${id}/lock`,
  },
  CERTIFICATE: {
    LIST: "/certificates",
    DETAIL: (id) => `/certificates/${id}`,
    DOWNLOAD: (id) => `/certificates/${id}/download`,
    REVOKE: (id) => `/certificates/${id}/revoke`,
  },

  // 9. DASHBOARD DATA METRICS
  DASHBOARD: {
    OVERVIEW: "/dashboard/overview",
    REVENUE: "/dashboard/revenue",
    STUDENTS: "/dashboard/students",
    COURSES: "/dashboard/courses",
    CLASSES: "/dashboard/classes",
    ATTENDANCE: "/dashboard/attendance",
    CERTIFICATES: "/dashboard/certificates",
  },
};