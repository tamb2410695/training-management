import { buildEnum } from "@/utils";

export const GENDER = buildEnum({
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

export const STAFF_STATUS = buildEnum({
  DISABLE: {
    label: "Vô hiệu hóa",
    color: "secondary",
    order: 1,
  },

  ACTIVE: {
    label: "Đang làm việc",
    color: "success",
    order: 2,
  },

  SUSPENDED: {
    label: "Tạm đình chỉ",
    color: "warning",
    order: 3,
  },

  ON_LEAVE: {
    label: "Đang nghỉ phép",
    color: "info",
    order: 4,
  },

  TERMINATED: {
    label: "Đã nghỉ việc",
    color: "danger",
    order: 5,
  },
});

export const CONTRACT_TYPE = buildEnum({
  PROBATION: {
    label: "Thử việc",
    color: "warning",
    order: 1,
  },

  FULL_TIME: {
    label: "Toàn thời gian",
    color: "success",
    order: 2,
  },

  PART_TIME: {
    label: "Bán thời gian",
    color: "info",
    order: 3,
  },
});

export const STAFF_MESSAGES = {
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
