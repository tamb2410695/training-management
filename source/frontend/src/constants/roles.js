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

// 
export const ROLES_OPTIONS = Object.values(ROLES).map((role) => ({
  VALUE: role.CODE,
  LABEL: role.LABEL,
}));

export const ROLE_FIELDS = {
  roleId: {
    key: "roleId",
    label: "Mã vai trò",
  },

  roleCode: {
    key: "roleCode",
    label: "Mã quyền",
  },

  roleName: {
    key: "roleName",
    label: "Tên vai trò",
  },

  roleDescription: {
    key: "roleDescription",
    label: "Mô tả",
  },
};

export const ROLE_CODES = {
  ADMIN: "ADMIN",
  INSTRUCTOR: "INSTRUCTOR",
  STUDENT: "STUDENT",
};

export const ROLE_NAMES = {
  ADMIN: "Quản trị viên",
  INSTRUCTOR: "Giảng viên",
  STUDENT: "Học viên",
};

export const ROLE_OPTIONS = [
  {
    value: ROLE_CODES.ADMIN,
    label: ROLE_NAMES.ADMIN,
  },
  {
    value: ROLE_CODES.INSTRUCTOR,
    label: ROLE_NAMES.INSTRUCTOR,
  },
  {
    value: ROLE_CODES.STUDENT,
    label: ROLE_NAMES.STUDENT,
  },
];