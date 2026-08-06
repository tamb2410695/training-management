export const COMPONENT_ROUTES = {
  HOME: "",
  UNAUTHORIZED: "unauthorized",

  AUTH: {
    _BASE: "auth",
    LOGIN: "login",
    REGISTER: "register",
    ACTIVATE_ACCOUNT: "activate-account",
    FORGOT_PASSWORD: "forgot-password",
    RESET_PASSWORD: "reset-password",
  },

  ADMIN: {
    _BASE: "admin",
    DASHBOARD: "",
    OVERVIEW: "overview",
    ACCOUNTS: "accounts",
    STAFFS: "staffs",
    COURSE_CATEGORY: "course-category",
    COURSES: "courses",
    CLASSES: "classes",
    DOCUMENTS: "documents",
    STUDENTS: "students",
    REGISTRATIONS: "registrations",
    ENROLLMENTS: "enrollments",
  },

  STUDENT: {
    _BASE: "student",
    DASHBOARD: "",
    PROFILE: "profile",
    MY_COURSES: "courses",
    COURSE_STUDY: "courses/:id",
  },

  INSTRUCTOR: {
    _BASE: "instructor",
    DASHBOARD: "",
    PROFILE: "profile",
    TEACHING_CLASSES: "teaching",
    CLASS_DETAIL: "teaching/:id",
    DOCUMENT: "document",
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