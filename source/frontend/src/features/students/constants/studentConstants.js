export const STUDENT_STATUS = {
  INCOMPLETE: {
    CODE: "INCOMPLETE",
    LABEL: "Chưa hoàn thiện hồ sơ",
    COLOR: "orange",
  },
  ACTIVE: {
    CODE: "ACTIVE",
    LABEL: "Đang học",
    COLOR: "green",
  },
  SUSPENDED: {
    CODE: "SUSPENDED",
    LABEL: "Bảo lưu",
    COLOR: "yellow",
  },
  GRADUATED: {
    CODE: "GRADUATED",
    LABEL: "Đã tốt nghiệp",
    COLOR: "blue",
  },
  WITHDRAWN: {
    CODE: "WITHDRAWN",
    LABEL: "Đã thôi học",
    COLOR: "red",
  },
};

export const STUDENT_STATUS_OPTIONS = Object.values(STUDENT_STATUS).map((status) => ({
  VALUE: status.CODE,
  LABEL: status.LABEL,
}));