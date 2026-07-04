// export const UI_ROUTES = {
//   // 1. PUBLIC & AUTHENTICATION PAGES
//   PUBLIC: {
//     HOME: "/",
//     LANDING: "/welcome",
//   },
//   AUTH: {
//     LOGIN: "/login",
//     REGISTER: "/register",
//     FORGOT_PASSWORD: "/forgot-password",
//     RESET_PASSWORD: "/reset-password",
//     UNAUTHORIZED: "/unauthorized",
//   },

//   // 2. STUDENT PORTAL (Màn hình dành riêng cho Học viên)
//   PORTAL: {
//     DASHBOARD: "/portal/dashboard",
//     MY_COURSES: "/portal/my-courses",
//     COURSE_STUDY: (id) => `/portal/courses/${id}`,
//     MY_SCHEDULE: "/portal/my-schedule",
//     MY_TRANSCRIPT: "/portal/my-transcript",
//     MY_CERTIFICATES: "/portal/my-certificates",
//     PROFILE: "/portal/profile",
//   },

//   // 3. ADMIN & STAFF MANAGEMENT DASHBOARD (Hệ thống quản trị)
//   DASHBOARD: {
//     OVERVIEW: "/admin/dashboard",
//     REVENUE: "/admin/revenue",
//     STUDENTS: "/admin/dashboard/students",
//     COURSES: "/admin/dashboard/courses",
//     CLASSES: "/admin/dashboard/classes",
//     ATTENDANCE: "/admin/dashboard/attendance",
//     CERTIFICATES: "/admin/dashboard/certificates",
//   },

//   // 4. ROLE & ACCOUNT MANAGEMENT
//   ACCOUNT: {
//     LIST: "/admin/accounts",
//     DETAIL: (id) => `/admin/accounts/${id}`,
//     ROLES: "/admin/roles",
//   },

//   // 5. STAFF & DEPARTMENT
//   STAFF: {
//     LIST: "/admin/staffs",
//     DETAIL: (id) => `/admin/staffs/${id}`,
//     DEPARTMENTS: "/admin/departments",
//     DEPARTMENT_DETAIL: (id) => `/admin/departments/${id}`,
//   },

//   // 6. COURSE & DOCUMENT MANAGEMENT
//   COURSE: {
//     LIST: "/admin/courses",
//     DETAIL: (id) => `/admin/courses/${id}`,
//     DOCUMENTS: (id) => `/admin/courses/${id}/documents`,
//   },

//   // 7. CLASS, ROOM & SCHEDULE MANAGEMENT
//   CLASS: {
//     LIST: "/admin/classes",
//     DETAIL: (id) => `/admin/classes/${id}`,
//     SCHEDULES: (id) => `/admin/classes/${id}/schedules`,
//     ROOMS: "/admin/rooms",
//     ROOM_DETAIL: (id) => `/admin/rooms/${id}`,
//   },

//   // 8. REGISTRATION & STUDENT MANAGEMENT
//   REGISTRATION: {
//     LIST: "/admin/registrations",
//     DETAIL: (id) => `/admin/registrations/${id}`,
//   },
//   STUDENT: {
//     LIST: "/admin/students",
//     DETAIL: (id) => `/admin/students/${id}`,
//   },

//   // 9. ENROLLMENT, FINANCE & PERFORMANCE
//   FINANCE: {
//     ENROLLMENTS: "/admin/enrollments",
//     ENROLLMENT_DETAIL: (id) => `/admin/enrollments/${id}`,
//     PAYMENTS: "/admin/payments",
//     PAYMENT_DETAIL: (id) => `/admin/payments/${id}`,
//   },
//   ACADEMIC: {
//     ATTENDANCES: "/admin/attendances",
//     GRADES: "/admin/grades",
//     GRADE_DETAIL: (id) => `/admin/grades/${id}`,
//     CERTIFICATES: "/admin/certificates",
//   },
// };

export const COMPONENT_ROUTES = {
  HOME: "",
  UNAUTHORIZED: "unauthorized",

  AUTH: {
    _BASE: "auth",
    LOGIN: "login",
    REGISTER: "register",
    FORGOT_PASSWORD: "forgot-password",
    RESET_PASSWORD: "reset-password",
  },

  ADMIN: {
    _BASE: "admin",
    DASHBOARD: "",
    OVERVIEW: "overview",
    REVENUE: "revenue",
    ACCOUNTS: "accounts",
    ROLES: "roles",
    STAFFS: "staffs",
    DEPARTMENTS: "departments",
    COURSES: "courses",
    DOCUMENTS: "documents",
    CLASSES: "classes",
    ROOMS: "rooms",
    SCHEDULES: "schedules",
    REGISTRATIONS: "registrations",
    STUDENTS: "students",
    ENROLLMENTS: "enrollments",
    PAYMENTS: "payments",
    ATTENDANCES: "attendances",
    GRADES: "grades",
    CERTIFICATES: "certificates",
  },

  STUDENT: {
    _BASE: "student",
    DASHBOARD: "",
    PROFILE: "profile",
    MY_COURSES: "courses",
    COURSE_STUDY: "courses/:id",
    MY_SCHEDULE: "schedule",
    MY_TRANSCRIPT: "transcript",
    MY_CERTIFICATES: "certificates",
  },

  INSTRUCTOR: {
    _BASE: "instructor",
    DASHBOARD: "",
    PROFILE: "profile",
    TEACHING_CLASSES: "teaching",
    CLASS_DETAIL: "teaching/:id",
    SCHEDULE: "schedule",
    ATTENDANCE: "attendance",
    GRADES: "grades",
  },
};

const autoCompileRoutes = (source, parentPath = "") => {
  const result = {};
  const base = source._BASE ? `${parentPath}/${source._BASE}` : parentPath;

  Object.keys(source).forEach((key) => {
    if (key === "_BASE") return;

    const value = source[key];

    if (typeof value === "object" && value !== null) {
      result[key] = autoCompileRoutes(value, base);
    } else {
      const fullPath = `${base}/${value}`.replace(/\/+/g, "/");
      result[key] = fullPath === "" ? "/" : fullPath;
    }
  });

  return result;
};

export const ROUTES = autoCompileRoutes(COMPONENT_ROUTES);