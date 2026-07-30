import { API_ROUTES } from "@/constants";

export const COURSE_CONFIG = {
  entity: "courses",
  entityLabel: "Khóa học",

  api: API_ROUTES.COURSE,

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
      placeholder: "Tìm kiếm khóa học...",
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
      create: "Thêm mới khóa học",
      update: "Cập nhật thông tin khóa học",
      view: "Thông tin khóa học",
    },
    footerActions: ["cancel", "submit"],
  },
};

export const COURSE_WIZARD_CONFIG = {
  mode: "create",
  steps: [
    {
      key: "account",
      title: "Tài khoản",
      fields: ["username", "accountEmail", "password"],
    },
    {
      key: "profile",
      title: "Hồ sơ khóa học",
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
