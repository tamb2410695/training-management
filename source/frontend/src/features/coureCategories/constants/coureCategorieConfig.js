import { API_ROUTES } from "@/constants";

export const COURSE_CATEGORY_CONFIG = {
  entity: "categories",
  entityLabel: "Danh mục khóa học",

  api: API_ROUTES.COURSE_CATEGORY,

  idField: "categoryId",
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
      placeholder: "Tìm kiếm danh mục khóa học...",
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
    field: "categoryId",
    order: "desc",
  },

  form: {
    mode: "modal",
    title: {
      create: "Thêm mới danh mục khóa học",
      update: "Cập nhật thông tin danh mục khóa học",
      view: "Thông tin danh mục khóa học",
    },
    footerActions: ["cancel", "submit"],
  },
};
