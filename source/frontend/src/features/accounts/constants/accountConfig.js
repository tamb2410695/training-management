import { API_ROUTES } from "@/constants";

export const ACCOUNT_CONFIG = {
  entity: "accounts",
  entityLabel: "Học viên",

  api: API_ROUTES.ACCOUNT,

  idField: "accountId",
  codeField: null,
  nameField: "username",

  pagination: {
    limit: 10,
  },

  query: {
    filter: true,
    sort: true,
    search: {
      enabled: true,
      debounce: 600,
      placeholder: "Tìm kiếm tài khoản...",
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
      create: "Thêm mới tài khoản",
      update: "Cập nhật thông tin tài khoản",
      view: "Thông tin tài khoản",
    },
    footerActions: ["cancel", "submit"],
  },
};

export const ACCOUNT_WIZARD = {
  mode: "create",
  steps: {
    account: {
      title: "Tài khoản",
      fields: ["username", "accountEmail", "password"],
    },

    student: {
      title: "Học viên",
      fields: [
        "fullName",
        "personalEmail",
        "phone",
        "address",
        "dateOfBirth",
        "gender",
      ],
    },

    staff: {
      title: "Nhân viên",
      fields: ["fullName", "personalEmail", "phone"],
    },

    role: {
      title: "Vai trò",
      fields: ["roleCode"],
    },
  },
};
