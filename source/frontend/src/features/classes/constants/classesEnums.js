import { buildEnum } from "@/utils";

export const CLASS_STATUS = buildEnum({
  OPEN: {
    label: "Đang mở",
    color: "success",
    order: 1,
    filterable: true,
  },

  FULL: {
    label: "Đã đủ học viên",
    color: "warning",
    order: 2,
    filterable: true,
  },

  ONGOING: {
    label: "Đang diễn ra",
    color: "primary",
    order: 3,
    filterable: true,
  },

  COMPLETED: {
    label: "Đã hoàn thành",
    color: "secondary",
    order: 4,
    filterable: true,
  },

  CANCELLED: {
    label: "Đã hủy",
    color: "danger",
    order: 5,
    filterable: true,
  },
});


export const CLASS_MESSAGES = {
  CREATE_SUCCESS: "Tạo lớp học thành công.",
  UPDATE_SUCCESS: "Cập nhật lớp học thành công.",
  DELETE_SUCCESS: "Xóa lớp học thành công.",

  DELETE_CONFIRM:
    "Bạn có chắc chắn muốn xóa lớp học này không?",

  OPEN_SUCCESS:
    "Mở lớp học thành công.",

  OPEN_CONFIRM:
    "Bạn có chắc chắn muốn mở lớp học này không?",

  CANCEL_SUCCESS:
    "Hủy lớp học thành công.",

  CANCEL_CONFIRM:
    "Bạn có chắc chắn muốn hủy lớp học này không?",

  COMPLETE_SUCCESS:
    "Hoàn thành lớp học thành công.",
};