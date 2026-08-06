import { API_ROUTES } from "@/constants";

export const STUDENT_CONFIG = {
  entity: "profiles",
  entityLabel: "Học viên",

  api: API_ROUTES.STUDENT,

  idField: "studentId",
  codeField: "studentCode",
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
      placeholder: "Tìm kiếm học viên...",
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
      create: "Thêm mới học viên",
      update: "Cập nhật thông tin học viên",
      view: "Thông tin học viên",
    },
    footerActions: ["cancel", "submit"],
  },
};

export const STUDENT_WIZARD_CONFIG = {
  mode: "create",
  steps: [
    {
      key: "account",
      title: "Tài khoản",
      fields: ["username", "accountEmail", "password"],
    },
    {
      key: "student",
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
  ],
};
