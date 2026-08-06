import { API_ROUTES } from "@/constants";

export const REGISTRATION_CONFIG = {
  entity: "registrations",
  entityLabel: "Học viên",

  api: API_ROUTES.REGISTRATION,

  idField: "registrationId",
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
      placeholder: "Tìm kiếm đăng ký truy cập hệ thống...",
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
      create: "Thêm mới đăng ký truy cập hệ thống",
      update: "Cập nhật thông tin đăng ký truy cập hệ thống",
      view: "Thông tin đăng ký truy cập hệ thống",
    },
    footerActions: ["cancel", "submit"],
  },
};
