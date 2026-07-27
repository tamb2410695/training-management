export const ACCOUNT_STATUS = {
  PENDING: { CODE: "PENDING", LABEL: "Chờ duyệt", COLOR: "warning" },
  ACTIVE: { CODE: "ACTIVE", LABEL: "Hoạt động", COLOR: "success" },
  LOCKED: { CODE: "LOCKED", LABEL: "Đang khóa", COLOR: "danger" },
  DISABLED: { CODE: "DISABLED", LABEL: "Vô hiệu hóa", COLOR: "secondary" },
  DELETED: { CODE: "DELETED", LABEL: "Đã xóa", COLOR: "dark" },
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
  roleCodes: ACCOUNT_ROLE_OPTIONS, 
};

export const ACCOUNT_MESSAGES = {
  CREATE_SUCCESS: "Tạo tài khoản thành công.",
  UPDATE_SUCCESS: "Cập nhật tài khoản thành công.",
  DELETE_SUCCESS: "Xóa tài khoản thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa tài khoản này không?",
  
  ACTIVATE_SUCCESS: "Kích hoạt tài khoản thành công.",
  LOCK_SUCCESS: "Khóa tài khoản thành công.",
  DISABLE_SUCCESS: "Vô hiệu hóa tài khoản thành công.",
  
  LOCK_CONFIRM: "Bạn có chắc chắn muốn khóa tài khoản này không?",
  DISABLE_CONFIRM: "Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không?",
};