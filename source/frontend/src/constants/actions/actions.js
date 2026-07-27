export const ACTIONS = {
  CREATE: {
    key: "create",
    label: "Thêm mới",
    icon: "plus",
    variant: "primary",
    scope: "toolbar",
  },

  REFRESH: {
    key: "refresh",
    label: "Làm mới",
    icon: "arrow-clockwise",
    variant: "secondary",
    scope: "toolbar",
  },

  RESET: {
    key: "reset",
    label: "Đặt lại",
    icon: "arrow-counterclockwise",
    variant: "outline-secondary",
    scope: "toolbar",
  },

  SUBMIT: {
    key: "submit",
    label: "Lưu lại",
    icon: "check",
    variant: "primary",
    scope: "modal",
  },

  CANCEL: {
    key: "cancel",
    label: "Hủy",
    icon: "x",
    variant: "outline-secondary",
    scope: "modal",
  },

  VIEW: {
    key: "view",
    label: "Xem",
    icon: "eye",
    variant: "info",
    scope: "row",
  },

  UPDATE: {
    key: "update",
    label: "Sửa",
    icon: "pencil",
    variant: "warning",
    scope: "row",
  },

  DELETE: {
    key: "delete",
    label: "Xóa",
    icon: "trash",
    variant: "danger",
    scope: "row",
    confirm: true,
  },
};
