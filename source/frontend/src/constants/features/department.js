export const DEPARTMENT_FIELDS = {
  departmentId: {
    key: "departmentId",
    label: "Mã phòng ban",
    sortable: true,
  },

  departmentCode: {
    key: "departmentCode",
    label: "Mã phòng ban",
    required: { create: true, update: false },
    searchable: true,
    sortable: true,
    default: "",
  },

  departmentName: {
    key: "departmentName",
    label: "Tên phòng ban",
    required: { create: true, update: true },
    searchable: true,
    sortable: true,
    default: "",
  },
};

export const DEPARTMENT_COLUMNS = [
  DEPARTMENT_FIELDS.departmentId,
  DEPARTMENT_FIELDS.departmentCode,
  DEPARTMENT_FIELDS.departmentName,
].map(({ key, label }) => ({
  key,
  label,
}));

export const DEPARTMENT_MESSAGES = {
  CREATE_SUCCESS: "Tạo phòng ban thành công.",
  UPDATE_SUCCESS: "Cập nhật phòng ban thành công.",
  DELETE_SUCCESS: "Xóa phòng ban thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa phòng ban này không?",
};


// import { DEPARTMENT_FIELDS } from "./departmentFields";

export const DEFAULT_DEPARTMENT_FORM = {
  [DEPARTMENT_FIELDS.departmentCode.key]:
    DEPARTMENT_FIELDS.departmentCode.default,

  [DEPARTMENT_FIELDS.departmentName.key]:
    DEPARTMENT_FIELDS.departmentName.default,
};

export const DEFAULT_DEPARTMENT_UPDATE_FORM = {
  [DEPARTMENT_FIELDS.departmentName.key]:
    DEPARTMENT_FIELDS.departmentName.default,
};

export const DEPARTMENT_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: DEPARTMENT_FIELDS.departmentName.key,
  sortOrder: "asc",
};

export const DEPARTMENT_SEARCH_OPTIONS = Object.values(DEPARTMENT_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));

export const DEPARTMENT_SORT_OPTIONS = Object.values(DEPARTMENT_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));