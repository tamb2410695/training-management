import { API_ROUTES } from "@/constants";

export const DOCUMENT_CONFIG = {
  entity: "documents",
  entityLabel: "Học viên",

  api: API_ROUTES.DOCUMENT,

  idField: "documentId",
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
    rowActions: ["view", "update", "remove", "create"],
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

export const DOCUMENT_WIZARD = {
  mode: "create",
  steps: {
    document: {
      title: "Tài khoản",
      fields: ["username", "documentEmail", "password"],
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
