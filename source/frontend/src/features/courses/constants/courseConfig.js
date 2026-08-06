import { API_ROUTES } from "@/constants";

export const COURSE_CONFIG = {
  entity: "courses",
  entityLabel: "Khóa học",

  api: API_ROUTES.COURSE,

  idField: "courseId",
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
      placeholder: "Tìm kiếm khóa học...",
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
      create: "Thêm mới khóa học",
      update: "Cập nhật thông tin khóa học",
      view: "Thông tin khóa học",
    },
    footerActions: ["cancel", "submit"],
  },
};
