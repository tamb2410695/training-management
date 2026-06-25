export const ROLES = {
  ADMIN: {
    CODE: "ADMIN",
    LABEL: "Quản trị viên",
    COLOR: "purple",
  },
  INSTRUCTOR: {
    CODE: "INSTRUCTOR",
    LABEL: "Giảng viên",
    COLOR: "blue",
  },
  STUDENT: {
    CODE: "STUDENT",
    LABEL: "Học viên",
    COLOR: "green",
  },
};


export const ROLES_OPTIONS = Object.values(ROLES).map((role) => ({
  VALUE: role.CODE,
  LABEL: role.LABEL,
}));