import { INSTRUCTOR_FIELDS } from "./instructorFields";

// Tạo form khởi tạo dựa trên BODY.CREATE ở backend
export const DEFAULT_INSTRUCTOR_FORM = {
  [INSTRUCTOR_FIELDS.fullName.key]: INSTRUCTOR_FIELDS.fullName.default,
  [INSTRUCTOR_FIELDS.dateOfBirth.key]: INSTRUCTOR_FIELDS.dateOfBirth.default,
  [INSTRUCTOR_FIELDS.gender.key]: INSTRUCTOR_FIELDS.gender.default,
  [INSTRUCTOR_FIELDS.specialization.key]: INSTRUCTOR_FIELDS.specialization.default,
  [INSTRUCTOR_FIELDS.phone.key]: INSTRUCTOR_FIELDS.phone.default,
  [INSTRUCTOR_FIELDS.address.key]: INSTRUCTOR_FIELDS.address.default,
  [INSTRUCTOR_FIELDS.hireDate.key]: INSTRUCTOR_FIELDS.hireDate.default,
};

// Tạo form cập nhật dựa trên BODY.UPDATE ở backend
export const DEFAULT_INSTRUCTOR_UPDATE_FORM = {
  [INSTRUCTOR_FIELDS.fullName.key]: INSTRUCTOR_FIELDS.fullName.default,
  [INSTRUCTOR_FIELDS.dateOfBirth.key]: INSTRUCTOR_FIELDS.dateOfBirth.default,
  [INSTRUCTOR_FIELDS.gender.key]: INSTRUCTOR_FIELDS.gender.default,
  [INSTRUCTOR_FIELDS.specialization.key]: INSTRUCTOR_FIELDS.specialization.default,
  [INSTRUCTOR_FIELDS.phone.key]: INSTRUCTOR_FIELDS.phone.default,
  [INSTRUCTOR_FIELDS.address.key]: INSTRUCTOR_FIELDS.address.default,
  [INSTRUCTOR_FIELDS.hireDate.key]: INSTRUCTOR_FIELDS.hireDate.default,
  [INSTRUCTOR_FIELDS.instructorStatus.key]: INSTRUCTOR_FIELDS.instructorStatus.default,
};

// Bộ Query Params mặc định để call API list danh sách
export const INSTRUCTOR_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: INSTRUCTOR_FIELDS.createdAt.key,
  sortOrder: "desc",
  [INSTRUCTOR_FIELDS.gender.key]: "",
  [INSTRUCTOR_FIELDS.instructorStatus.key]: "",
  [INSTRUCTOR_FIELDS.specialization.key]: "",
};

// Tự động gom mảng Option phục vụ UI Search & Sort bar
export const INSTRUCTOR_SEARCH_OPTIONS = Object.values(INSTRUCTOR_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({ value: key, label }));

export const INSTRUCTOR_SORT_OPTIONS = Object.values(INSTRUCTOR_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({ value: key, label }));