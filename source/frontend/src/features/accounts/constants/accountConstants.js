export const ACCOUNT_QUERY = {
  SEARCH_FIELDS: [
    "username",
    "email",
    "roleName",
  ],

  FILTER_FIELDS: [
    "accountStatus",
    "roleName",
  ],

  SORT_FIELDS: [
    "accountId",
    "username",
    "email",
    "createdAt",
    "updatedAt",
  ],
};

export const DEFAULT_ACCOUNT_FORM = {
  username: "",
  email: "",
  password: "",
  roleName: "",
  avatarUrl: "",
};

export const DEFAULT_ACCOUNT_UPDATE_FORM = {
  username: "",
  email: "",
  avatarUrl: "",
  accountStatus: "",
  roleName: "",
};

export const ACCOUNT_REQUIRED_FIELDS = {
  CREATE: [
    "username",
    "email",
    "password",
    "roleName",
  ],

  UPDATE: [
    "username",
    "email",
    "accountStatus",
    "roleName",
  ],
};export const ACCOUNT_COLUMNS = [
  {
    key: "accountId",
    label: "ID",
  },
  {
    key: "username",
    label: "Username",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "roleName",
    label: "Role",
  },
  {
    key: "accountStatus",
    label: "Status",
  },
];
export const ACCOUNT_SEARCH_OPTIONS = [
  {
    value: "username",
    label: "Username",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "roleName",
    label: "Role",
  },
];
export const ACCOUNT_SORT_OPTIONS = [
  {
    value: "username",
    label: "Username",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "createdAt",
    label: "Created Date",
  },
  {
    value: "updatedAt",
    label: "Updated Date",
  },
];
export const ACCOUNT_FILTERS = {
  accountStatus: [
    {
      value: "ACTIVE",
      label: "Active",
    },
    {
      value: "INACTIVE",
      label: "Inactive",
    },
  ],

  roleName: [
    {
      value: "ADMIN",
      label: "Admin",
    },
    {
      value: "STUDENT",
      label: "Student",
    },
    {
      value: "INSTRUCTOR",
      label: "Instructor",
    },
  ],
};
export const ACCOUNT_MESSAGES = {
  CREATE_SUCCESS:
    "Create account successfully.",

  UPDATE_SUCCESS:
    "Update account successfully.",

  DELETE_SUCCESS:
    "Delete account successfully.",

  DELETE_CONFIRM:
    "Are you sure you want to delete this account?"
};

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

export const ACCOUNT_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  roleName: "",
  accountStatus: "",
};

export const ACCOUNT_STATUS_OPTIONS = Object.values(ACCOUNT_STATUS).map((status) => ({
  VALUE: status.CODE,
  LABEL: status.LABEL,
}));