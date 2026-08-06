const ROUTES = {
  AUTH: {
    BASE: "/auth",
    REGISTER: "/register",
    ACTIVATE: "/activate",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH_TOKEN: "/refresh-token",
    CHANGE_PASSWORD: "/change-password",
    PROFILE: "/me",
  },

  ACCOUNT: {
    BASE: "/accounts",
    ROOT: "/",
    DETAIL: "/:id",

    LOCK: "/:id/lock",
    ACTIVATE: "/:id/activate",
    DISABLE: "/:id/disable",

    PROFILE: "/profile",
  },


  STAFF: {
    BASE: "/staffs",
    ROOT: "/",
    DETAIL: "/:id",
  },


  STUDENT: {
    BASE: "/students",
    ROOT: "/",
    DETAIL: "/:id",
  },


  COURSE_CATEGORY: {
    BASE: "/course-categories",
    ROOT: "/",
    DETAIL: "/:id",
  },


  COURSE: {
    BASE: "/courses",
    ROOT: "/",
    DETAIL: "/:id",

    PUBLISH: "/:id/publish",
    ARCHIVE: "/:id/archive",

    DOCUMENTS: "/:id/documents",
  },


  CLASS: {
    BASE: "/classes",
    ROOT: "/",
    DETAIL: "/:id",

    ASSIGN_INSTRUCTOR:
      "/:id/assign-instructor",

    OPEN:
      "/:id/open",

    START:
      "/:id/start",

    COMPLETE:
      "/:id/complete",

    CANCEL:
      "/:id/cancel",

    CAPACITY:
      "/:id/capacity",
  },


  REGISTRATION: {
    BASE: "/registrations",
    ROOT: "/",
    DETAIL: "/:id",

    APPROVE:
      "/:id/approve",

    REJECT:
      "/:id/reject",
  },


  ENROLLMENT: {
    BASE: "/enrollments",
    ROOT: "/",
    DETAIL: "/:id",

    APPROVE:
      "/:id/approve",

    REJECT:
      "/:id/reject",
  },


  DOCUMENT: {
    BASE: "/documents",
    ROOT: "/",

    UPLOAD:
      "/upload",

    DETAIL:
      "/:id",

    DOWNLOAD:
      "/:id/download",

    RESTORE:
      "/:id/restore",
    ARCHIVE:
      "/:id/archive",
  },


  DASHBOARD: {
    BASE: "/dashboard",
    ROOT: "/",

    OVERVIEW:
      "/overview",

    STUDENTS:
      "/students",

    COURSES:
      "/courses",

    CLASSES:
      "/classes",

    ENROLLMENTS:
      "/enrollments",

    DOCUMENTS:
      "/documents",
  },


  COMMON_ACTIONS: {
    APPROVE: "approve",
    REJECT: "reject",

    PUBLISH: "publish",
    ARCHIVE: "archive",

    OPEN: "open",
    START: "start",
    COMPLETE: "complete",
    CANCEL: "cancel",

    LOCK: "lock",
    ACTIVATE: "activate",
    DISABLE: "disable",
  },
};


module.exports = {
  ROUTES,
};