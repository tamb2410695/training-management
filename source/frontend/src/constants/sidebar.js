import { ROUTES } from "./routes";

export const SIDEBAR_MENU = {
  ADMIN: [
    {
      label: "Dashboard",
      path: ROUTES.ADMIN.DASHBOARD,
    },
    {
      label: "Accounts",
      path: ROUTES.ADMIN.ACCOUNTS,
    },
    {
      label: "Students",
      path: ROUTES.ADMIN.STUDENTS,
    },
    {
      label: "Instructors",
      path: ROUTES.ADMIN.INSTRUCTORS,
    },
    {
      label: "Courses",
      path: ROUTES.ADMIN.COURSES,
    },
  ],

  STUDENT: [
    {
      label: "Dashboard",
      path: ROUTES.STUDENT.DASHBOARD,
    },
    {
      label: "Profile",
      path: ROUTES.STUDENT.PROFILE,
    },
  ],

  INSTRUCTOR: [
    {
      label: "Dashboard",
      path: ROUTES.INSTRUCTOR.DASHBOARD,
    },
    {
      label: "Profile",
      path: ROUTES.INSTRUCTOR.PROFILE,
    },
  ],
};
