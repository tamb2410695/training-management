import { ROUTES } from "./uiRoutes"; // Hãy đảm bảo đường dẫn import chính xác với project của bạn

export const SIDEBAR_MENU = {
  ADMIN: [
    {
      label: "Tổng quan (Dashboard)",
      path: ROUTES.ADMIN.DASHBOARD,
    },
    {
      label: "Báo cáo doanh thu",
      path: ROUTES.ADMIN.REVENUE,
    },
    {
      label: "Quản lý tài khoản",
      path: ROUTES.ADMIN.ACCOUNTS,
    },
    {
      label: "Quản lý vai trò (Role)",
      path: ROUTES.ADMIN.ROLES,
    },
    {
      label: "Quản lý nhân sự & GV",
      path: ROUTES.ADMIN.STAFFS,
    },
    {
      label: "Quản lý phòng ban",
      path: ROUTES.ADMIN.DEPARTMENTS,
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
      label: "Quản lý lớp học",
      path: ROUTES.ADMIN.CLASSES,
    },
    {
      label: "Quản lý phòng học",
      path: ROUTES.ADMIN.ROOMS,
    },
    {
      label: "Quản lý lịch học",
      path: ROUTES.ADMIN.SCHEDULES,
    },
    {
      label: "Đơn ký danh học viên",
      path: ROUTES.ADMIN.REGISTRATIONS,
    },
    {
      label: "Quản lý học viên",
      path: ROUTES.ADMIN.STUDENTS,
    },
    {
      label: "Quản lý nhập học",
      path: ROUTES.ADMIN.ENROLLMENTS,
    },
    {
      label: "Quản lý hóa đơn/Học phí",
      path: ROUTES.ADMIN.PAYMENTS,
    },
    {
      label: "Quản lý chuyên cần",
      path: ROUTES.ADMIN.ATTENDANCES,
    },
    {
      label: "Quản lý điểm số",
      path: ROUTES.ADMIN.GRADES,
    },
    {
      label: "Quản lý cấp chứng chỉ",
      path: ROUTES.ADMIN.CERTIFICATES,
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
      label: "Lịch học cá nhân",
      path: ROUTES.STUDENT.MY_SCHEDULE,
    },
    {
      label: "Tra cứu bảng điểm",
      path: ROUTES.STUDENT.MY_TRANSCRIPT,
    },
    {
      label: "Chứng chỉ của tôi",
      path: ROUTES.STUDENT.MY_CERTIFICATES,
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
      label: "Lịch dạy của tôi",
      path: ROUTES.INSTRUCTOR.TEACHING_CLASSES,
    },
    {
      label: "Thời khóa biểu tuần",
      path: ROUTES.INSTRUCTOR.SCHEDULE,
    },
    {
      label: "Điểm danh học viên",
      path: ROUTES.INSTRUCTOR.ATTENDANCE,
    },
    {
      label: "Quản lý nhập điểm",
      path: ROUTES.INSTRUCTOR.GRADES,
    },
    {
      label: "Thông tin cá nhân",
      path: ROUTES.INSTRUCTOR.PROFILE,
    },
  ],
};