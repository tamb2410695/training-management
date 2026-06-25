export const COURSE_STATUS = {
  PENDING: {
    CODE: "PENDING",
    LABEL: "Chờ duyệt",
    COLOR: "orange",
  },
  ACTIVE: {
    CODE: "ACTIVE",
    LABEL: "Đang mở",
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


export const COURSE_STATUS_OPTIONS = Object.values(COURSE_STATUS).map((status) => ({
  VALUE: status.CODE,
  LABEL: status.LABEL,
}));