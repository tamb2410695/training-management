import { buildEnum } from "@/utils";

export const COURSE_STATUS = buildEnum({
  ACTIVE: {
    label: "Đang hoạt động",
    color: "success",
    order: 1,
    filterable: true,
  },

  DISABLE: {
    label: "Ngừng sử dụng",
    color: "warning",
    order: 2,
    filterable: true,
  },

  DELETED: {
    label: "Đã xóa",
    color: "danger",
    order: 3,
    filterable: false,
  },
});

export const COURSE_MESSAGES = {
  CREATE_SUCCESS: "Tạo khóa học thành công.",
  UPDATE_SUCCESS: "Cập nhật khóa học thành công.",
  DELETE_SUCCESS: "Xóa khóa học thành công.",

  DELETE_CONFIRM:
    "Bạn có chắc chắn muốn xóa khóa học này không?",

  ACTIVATE_SUCCESS:
    "Kích hoạt khóa học thành công.",

  ACTIVATE_CONFIRM:
    "Bạn có chắc chắn muốn kích hoạt khóa học này không?",

  DISABLE_SUCCESS:
    "Ngừng sử dụng khóa học thành công.",

  DISABLE_CONFIRM:
    "Bạn có chắc chắn muốn ngừng sử dụng khóa học này không?",
};