import { buildEnum } from "@/utils";

export const ENROLLMENT_STATUS = buildEnum({
  PENDING: {
    label: "Chờ duyệt",
    color: "warning",
    order: 1,
    filterable: true,
  },

  APPROVED: {
    label: "Đã duyệt",
    color: "success",
    order: 2,
    filterable: true,
  },

  REJECTED: {
    label: "Từ chối",
    color: "danger",
    order: 3,
    filterable: true,
  },
});


export const ENROLLMENT_MESSAGES = {
  CREATE_SUCCESS:
    "Tạo đăng ký lớp học thành công.",

  UPDATE_SUCCESS:
    "Cập nhật đăng ký lớp học thành công.",

  DELETE_SUCCESS:
    "Xóa đăng ký lớp học thành công.",

  DELETE_CONFIRM:
    "Bạn có chắc chắn muốn xóa đăng ký lớp học này không?",

  APPROVE_SUCCESS:
    "Duyệt đăng ký lớp học thành công.",

  APPROVE_CONFIRM:
    "Bạn có chắc chắn muốn duyệt đăng ký lớp học này không?",

  REJECT_SUCCESS:
    "Từ chối đăng ký lớp học thành công.",

  REJECT_CONFIRM:
    "Bạn có chắc chắn muốn từ chối đăng ký lớp học này không?",
};