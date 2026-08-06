import { ROUTES } from "./uiRoutes"; // Hãy đảm bảo đường dẫn import chính xác với project của bạn

export const SIDEBAR_MENU = {
  ADMIN: [
    {
      label: "Tổng quan (Dashboard)",
      path: ROUTES.ADMIN.DASHBOARD,
    },
    {
      label: "Quản lý tài khoản",
      path: ROUTES.ADMIN.ACCOUNTS,
    },
    {
      label: "Quản lý nhân sự",
      path: ROUTES.ADMIN.STAFFS,
    },
    {
      label: "Quản lý danh mục\nkhóa học",
      path: ROUTES.ADMIN.COURSE_CATEGORY,
    },
    {
      label: "Quản lý khóa học",
      path: ROUTES.ADMIN.COURSES,
    },
    {
      label: "Quản lý lớp học",
      path: ROUTES.ADMIN.CLASSES,
    },
    {
      label: "Quản lý tài liệu",
      path: ROUTES.ADMIN.DOCUMENTS,
    },
    {
      label: "Đơn đăng ký học viên",
      path: ROUTES.ADMIN.REGISTRATIONS,
    },
    {
      label: "Quản lý học viên",
      path: ROUTES.ADMIN.STUDENTS,
    },
    {
      label: "Quản lý ghi danh\nkhóa học",
      path: ROUTES.ADMIN.ENROLLMENTS,
    },
  ],

  STUDENT: [
    {
      label: "Bảng điều khiển",
      path: ROUTES.STUDENT.DASHBOARD,
    },
    {
      label: "Khóa học của tôi",
      path: ROUTES.STUDENT.MY_COURSES,
    },
    {
      label: "Thông tin cá nhân",
      path: ROUTES.STUDENT.PROFILE,
    },
  ],

  INSTRUCTOR: [
    {
      label: "Bảng điều khiển",
      path: ROUTES.INSTRUCTOR.DASHBOARD,
    },
    {
      label: "Quản lý khóa học",
      path: ROUTES.INSTRUCTOR.COURSES,
    },
    {
      label: "Tài liệu môn học",
      path: ROUTES.INSTRUCTOR.DOCUMENTS,
    },
    {
      label: "Thông tin cá nhân",
      path: ROUTES.INSTRUCTOR.PROFILE,
    },
  ],
};
