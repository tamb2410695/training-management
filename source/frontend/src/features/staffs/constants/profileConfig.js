import { API_ROUTES } from "@/constants";

export const STAFF_PROFILE_CONFIG = {
  entity: "profiles",
  entityLabel: "Nhân sự",

  api: API_ROUTES.STAFF,

  idField: "staffId",
  codeField: "staffCode",
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
      placeholder: "Tìm kiếm nhân sự...",
    },
  },

  table: {
    selection: {
      enabled: true,
      mode: "single",
    },

    toolbar: ["create", "refresh", "reset"],
    rowActions: ["view", "update", "remove"],
    showIndex: true,
  },

  defaultSort: {
    field: "createdAt",
    order: "desc",
  },

  form: {
    mode: "modal",
    title: {
      create: "Thêm mới nhân sự",
      update: "Cập nhật thông tin nhân sự",
      view: "Thông tin nhân sự",
    },
    footerActions: ["cancel", "submit"],
  },
};

export const STAFF_PROFILE_WIZARD_CONFIG = {
  mode: "create",
  steps: [
    {
      key: "account",
      title: "Tài khoản",
      fields: ["username", "accountEmail", "password", "roleCode"],
    },
    {
      key: "profile",
      title: "Hồ sơ nhân sự",
      fields: [
        "fullName",
        "personalEmail",
        "phone",
        "contractType",
        "address",
        "dateOfBirth",
        "gender",
      ],
    },
  ],
};
