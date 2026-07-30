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
      label: "Quản lý phòng ban",
      path: ROUTES.ADMIN.DEPARTMENTS,
    },
    {
      label: "Quản lý nhân sự",
      path: ROUTES.ADMIN.STAFFS,
    },
    {
      label: "Quản lý khóa học",
      path: ROUTES.ADMIN.COURSES,
    },
    {
      label: "Tài liệu môn học",
      path: ROUTES.ADMIN.DOCUMENTS,
    },
    {
      label: "Quản lý phòng học",
      path: ROUTES.ADMIN.ROOMS,
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
      label: "Báo cáo doanh thu",
      path: ROUTES.ADMIN.REVENUE,
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
      path: ROUTES.ADMIN.COURSES,
    },
    {
      label: "Tài liệu môn học",
      path: ROUTES.ADMIN.DOCUMENTS,
    },
    {
      label: "Thông tin cá nhân",
      path: ROUTES.INSTRUCTOR.PROFILE,
    },
  ],
};
