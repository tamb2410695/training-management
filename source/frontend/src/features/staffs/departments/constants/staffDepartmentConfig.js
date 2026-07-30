import { API_ROUTES } from "@/constants";

export const STAFF_DEPARTMENT_CONFIG = {
  entity: "departments",
  entityLabel: "Phòng ban",

  api: API_ROUTES.STAFF_DEPARTMENT,

  idField: "departmentId",
  codeField: "departmentCode",
  nameField: "fullName",

  pagination: {
    limit: 10,
  },

  query: {
    filter: true,
    sort: true,
    search: {
      enabled: true,
      debounce: 600,
      placeholder: "Tìm kiếm phòng ban...",
    },
  },

  table: {
    selection: {
      enabled: true,
      mode: "single",
    },

    toolbar: ["create", "refresh", "reset"],
    rowActions: ["view", "update", "delete"],
    showIndex: true,
  },

  defaultSort: {
    field: "createdAt",
    order: "desc",
  },

  form: {
    mode: "modal",
    title: {
      create: "Thêm mới phòng ban",
      update: "Cập nhật thông tin phòng ban",
      view: "Thông tin phòng ban",
    },
    footerActions: ["cancel", "submit"],
  },
};

export const STAFF_DEPARTMENT_WIZARD_CONFIG = {
  mode: "create",
  steps: [
    {
      key: "account",
      title: "Tài khoản",
      fields: ["username", "accountEmail", "password"],
    },
    {
      key: "profile",
      title: "Hồ sơ phòng ban",
      fields: [
        "fullName",
        "personalEmail",
        "phone",
        "address",
        "dateOfBirth",
        "gender",
      ],
    },
  ],
};
