export const ACCOUNT_STATUS = {
  PENDING: { CODE: "PENDING", LABEL: "Chờ duyệt", COLOR: "orange" },
  ACTIVE: { CODE: "ACTIVE", LABEL: "Hoạt động", COLOR: "green" },
  LOCKED: { CODE: "LOCKED", LABEL: "Đang khóa", COLOR: "red" },
  DISABLED: { CODE: "DISABLED", LABEL: "Vô hiệu hóa", COLOR: "gray" },
  DELETED: { CODE: "DELETED", LABEL: "Đã xóa", COLOR: "black" },
};

export const ACCOUNT_ROLES = {
  ADMIN: { CODE: "ADMIN", LABEL: "Quản trị viên" },
  STUDENT: { CODE: "STUDENT", LABEL: "Học viên" },
  INSTRUCTOR: { CODE: "INSTRUCTOR", LABEL: "Giảng viên" },
};

export const ACCOUNT_STATUS_OPTIONS = Object.values(ACCOUNT_STATUS).map((status) => ({
  value: status.CODE,
  label: status.LABEL,
}));

export const ACCOUNT_ROLE_OPTIONS = Object.values(ACCOUNT_ROLES).map((role) => ({
  value: role.CODE,
  label: role.LABEL,
}));

export const ACCOUNT_FILTERS = {
  accountStatus: ACCOUNT_STATUS_OPTIONS,
  roleName: ACCOUNT_ROLE_OPTIONS,
};

export const ACCOUNT_MESSAGES = {
  CREATE_SUCCESS: "Tạo tài khoản thành công.",
  UPDATE_SUCCESS: "Cập nhật tài khoản thành công.",
  DELETE_SUCCESS: "Xóa tài khoản thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa tài khoản này không?",
};