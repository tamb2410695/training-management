const ROUTES = {
  // 1. AUTHENTICATION (Mã: AUTH)
  AUTH: {
    BASE: "/auth",
    REGISTER: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH_TOKEN: "/refresh-token",
    CHANGE_PASSWORD: "/change-password",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    PROFILE: "/me",
  },

  // 2. ROLE & ACCOUNT MANAGEMENT (Mã: ACCOUNT)
  ROLE: {
    BASE: "/roles",
    ROOT: "/",
    DETAIL: "/:id",
  },
  ACCOUNT: {
    BASE: "/accounts",
    ROOT: "/",
    DETAIL: "/:id",
    PENDING: "/:id/pending",
    ACTIVATE: "/:id/activate",
    LOCK: "/:id/lock",
    DISABLE: "/:id/disable",
    DELETE: "/:id/delete",
    PROFILE: "/profile",
  },

  // 3. STAFF & DEPARTMENT MANAGEMENT (Mã: STAFF)
  STAFF: {
    BASE: "/staffs",
    ROOT: "/",
    DETAIL: "/:id",
    DEPARTMENTS: "/:id/departments",
    CAPABILITIES: "/:id/capabilities",
  },
  DEPARTMENT: {
    BASE: "/departments",
    ROOT: "/",
    DETAIL: "/:id",
    STAFFS: "/:id/staffs",
  },
  STAFF_DEPARTMENT: {
    BASE: "/staff-departments",
    ROOT: "/",
    ASSIGN: "/assign",
    REMOVE: "/staff/:staffId/department/:departmentId",
  },
  STAFF_CAPABILITY: {
    BASE: "/staff-capabilities",
    ROOT: "/",
    ASSIGN: "/assign",
    REMOVE: "/staff/:staffId/course/:courseId",
  },

  // 4. COURSE & DOCUMENT MANAGEMENT (Mã: COURSE)
  COURSE: {
    BASE: "/courses",
    ROOT: "/",
    DETAIL: "/:id",
    DOCUMENTS: "/:id/documents",
    PUBLISH: "/:id/publish",
    LOCK: "/:id/lock",
  },
  DOCUMENT: {
    BASE: "/documents",
    ROOT: "/",
    DETAIL: "/:id",
    DOWNLOAD: "/:id/download",
  },

  // 5. CLASS, ROOM & SCHEDULE MANAGEMENT (Mã: CLASS)
  CLASS: {
    BASE: "/classes",
    ROOT: "/",
    DETAIL: "/:id",
    SCHEDULES: "/:id/schedules",
    OPEN_REGISTRATION: "/:id/open-registration",
    CLOSE_REGISTRATION: "/:id/close-registration",
    START: "/:id/start",
    COMPLETE: "/:id/complete",
  },
  ROOM: {
    BASE: "/rooms",
    ROOT: "/",
    DETAIL: "/:id",
    AVAILABILITY: "/:id/availability",
  },
  SCHEDULE: {
    BASE: "/schedules",
    ROOT: "/",
    DETAIL: "/:id",
    ATTENDANCE: "/:id/attendance",
  },

  // 6. REGISTRATION & STUDENT MANAGEMENT (Mã: STUDENT)
  REGISTRATION: {
    BASE: "/registrations",
    ROOT: "/",
    DETAIL: "/:id",
    APPROVE: "/:id/approve",
    REJECT: "/:id/reject",
  },
  STUDENT: {
    BASE: "/students",
    ROOT: "/",
    DETAIL: "/:id",
    TRANSCRIPT: "/:id/transcript",
    CERTIFICATES: "/:id/certificates",
    ATTENDANCES: "/:id/attendances",
  },

  // 7. ENROLLMENT & FINANCE (Mã: FINANCE)
  ENROLLMENT: {
    BASE: "/enrollments",
    ROOT: "/",
    DETAIL: "/:id",
    CONFIRM: "/:id/confirm",
    CANCEL: "/:id/cancel",
    REFUND: "/:id/refund",
  },
  PAYMENT: {
    BASE: "/payments",
    ROOT: "/",
    DETAIL: "/:id",
    CONFIRM: "/:id/confirm",
    REFUND: "/:id/refund",
  },

  // 8. ATTENDANCE, GRADE & CERTIFICATE (Mã: ACADEMIC)
  ATTENDANCE: {
    BASE: "/attendances",
    ROOT: "/",
    DETAIL: "/:id",
  },
  GRADE: {
    BASE: "/grades",
    ROOT: "/",
    DETAIL: "/:id",
    PUBLISH: "/:id/publish",
    LOCK: "/:id/lock",
  },
  CERTIFICATE: {
    BASE: "/certificates",
    ROOT: "/",
    DETAIL: "/:id",
    DOWNLOAD: "/:id/download",
    REVOKE: "/:id/revoke",
  },

  // 9. SYSTEM METRICS & DASHBOARD
  DASHBOARD: {
    BASE: "/dashboard",
    OVERVIEW: "/overview",
    REVENUE: "/revenue",
    STUDENTS: "/students",
    COURSES: "/courses",
    CLASSES: "/classes",
    ATTENDANCE: "/attendance",
    CERTIFICATES: "/certificates",
  },

  // 10. REUSABLE COMMON ACTIONS
  COMMON_ACTIONS: {
    APPROVE: "approve",
    REJECT: "reject",
    CONFIRM: "confirm",
    CANCEL: "cancel",
    LOCK: "lock",
    ACTIVATE: "activate",
    DISABLE: "disable",
    PUBLISH: "publish",
  },
};

module.exports = {
  ROUTES,
};