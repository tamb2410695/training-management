import { buildEnum } from "@/utils";

export const ACCOUNT_STATUS = buildEnum({
  PENDING: {
    label: "Chờ kích hoạt",
    color: "warning",
    order: 1,
  },

  ACTIVE: {
    label: "Đang hoạt động",
    color: "success",
    order: 2,
  },

  LOCKED: {
    label: "Khóa",
    color: "danger",
    order: 3,
  },

  DISABLED: {
    label: "Vô hiệu hóa",
    color: "secondary",
    order: 4,
  },

  DELETED: {
    label: "Đã xóa",
    color: "dark",
    order: 5,
  },
});

export const ACCOUNT_ROLES = buildEnum({
  ADMIN: {
    label: "Quản trị viên",
    color: "danger",
    order: 1,
  },

  INSTRUCTOR: {
    label: "Giảng viên",
    color: "warning",
    order: 2,
  },

  STUDENT: {
    label: "Học viên",
    color: "success",
    order: 3,
  },
});

export const ACCOUNT_ROLE_GROUP = {
  STUDENT: [
    ACCOUNT_ROLES.values.STUDENT,
  ],

  STAFF: [
    ACCOUNT_ROLES.values.ADMIN,
    ACCOUNT_ROLES.values.INSTRUCTOR,
  ],
};


export const ACCOUNT_MESSAGES = {
  CREATE_SUCCESS: "Tạo tài khoản thành công.",
  UPDATE_SUCCESS: "Cập nhật tài khoản thành công.",
  DELETE_SUCCESS: "Xóa tài khoản thành công.",

  DELETE_CONFIRM:
    "Bạn có chắc chắn muốn xóa tài khoản này không?",

  ACTIVATE_SUCCESS:
    "Kích hoạt tài khoản thành công.",

  LOCK_SUCCESS:
    "Khóa tài khoản thành công.",

  DISABLE_SUCCESS:
    "Vô hiệu hóa tài khoản thành công.",

  ACTIVATE_CONFIRM:
    "Bạn có chắc chắn muốn kích hoạt tài khoản này không?",

  LOCK_CONFIRM:
    "Bạn có chắc chắn muốn khóa tài khoản này không?",

  DISABLE_CONFIRM:
    "Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không?",
};