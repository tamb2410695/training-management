export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },

  ADMIN: {
    DASHBOARD: "/admin",
    ACCOUNTS: "/admin/accounts",
    STUDENTS: "/admin/students",
    INSTRUCTORS: "/admin/instructors",
    COURSES: "/admin/courses",
    CLASSES: "/admin/classes",
  },

  STUDENT: {
    DASHBOARD: "/student",
    PROFILE: "/student/profile",
    MY_COURSES: "/student/courses",
  },

  INSTRUCTOR: {
    DASHBOARD: "/instructor",
    PROFILE: "/instructor/profile",
    TEACHING: "/instructor/teaching",
  },

  UNAUTHORIZED: "/unauthorized",
};

export const COMPONENT_ROUTES = {
  ADMIN: {
    DASHBOARD: "",
    ACCOUNTS: "accounts",
    STUDENTS: "students",
    INSTRUCTORS: "instructors",
    COURSES: "courses",
  },
  STUDENT: {
    DASHBOARD: "",
    PROFILE: "profile",
  },
  INSTRUCTOR: {
    DASHBOARD: "",
    PROFILE: "profile",
  },
};
