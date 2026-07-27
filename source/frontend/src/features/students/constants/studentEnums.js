import { buildEnum } from "@/utils";

export const STUDENT_GENDER = buildEnum({
  MALE: {
    label: "Nam",
    color: "primary",
    order: 1,
  },

  FEMALE: {
    label: "Nữ",
    color: "danger",
    order: 2,
  },

  OTHER: {
    label: "Khác",
    color: "secondary",
    order: 3,
  },
});

export const STUDENT_STATUS = buildEnum({
  INCOMPLETE: {
    label: "Chưa hoàn thiện",
    color: "warning",
    order: 1,
  },

  ACTIVE: {
    label: "Đang học",
    color: "success",
    order: 2,
  },

  SUSPENDED: {
    label: "Bảo lưu",
    color: "info",
    order: 3,
  },

  GRADUATED: {
    label: "Đã tốt nghiệp",
    color: "primary",
    order: 4,
  },

  WITHDRAWN: {
    label: "Thôi học",
    color: "dark",
    order: 5,
  },
});


export const STUDENT_MESSAGES = {
  CREATE_SUCCESS: "Tạo hồ sơ học viên thành công.",
  UPDATE_SUCCESS: "Cập nhật hồ sơ học viên thành công.",
  DELETE_SUCCESS: "Xóa hồ sơ học viên thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa học viên này khỏi hệ thống không?",

  SUSPEND_SUCCESS: "Bảo lưu trạng thái học viên thành công.",
  GRADUATE_SUCCESS: "Xác nhận tốt nghiệp cho học viên thành công.",
  WITHDRAW_SUCCESS: "Cập nhật trạng thái thôi học thành công.",

  SUSPEND_CONFIRM: "Bạn có chắc chắn muốn bảo lưu học phần của học viên này?",
  WITHDRAW_CONFIRM:
    "Bạn có chắc chắn muốn chuyển trạng thái học viên này sang thôi học?",
};
