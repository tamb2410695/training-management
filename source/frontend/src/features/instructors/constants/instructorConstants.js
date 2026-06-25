export const ACCOUNT_STATUS = {
  PENDING: {
    CODE: "PENDING",
    LABEL: "Chờ duyệt",
    COLOR: "orange",
  },
  ACTIVE: {
    CODE: "ACTIVE",
    LABEL: "Hoạt động",
    COLOR: "green",
  },
  LOCKED: {
    CODE: "LOCKED",
    LABEL: "Đang khóa",
    COLOR: "red",
  },
  DISABLED: {
    CODE: "DISABLED",
    LABEL: "Vô hiệu hóa",
    COLOR: "gray",
  },
  DELETED: {
    CODE: "DELETED",
    LABEL: "Đã xóa",
    COLOR: "black",
  },
};

export const ACCOUNT_STATUS_OPTIONS = Object.values(ACCOUNT_STATUS).map((status) => ({
  VALUE: status.CODE,
  LABEL: status.LABEL,
}));