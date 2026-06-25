import { STUDENT_FIELDS } from "./studentFields";

// Tạo form khởi tạo dựa trên cấu trúc BODY.CREATE ở backend
export const DEFAULT_STUDENT_FORM = {
  [STUDENT_FIELDS.fullName.key]: STUDENT_FIELDS.fullName.default,
  [STUDENT_FIELDS.dateOfBirth.key]: STUDENT_FIELDS.dateOfBirth.default,
  [STUDENT_FIELDS.gender.key]: STUDENT_FIELDS.gender.default,
  [STUDENT_FIELDS.phone.key]: STUDENT_FIELDS.phone.default,
  [STUDENT_FIELDS.address.key]: STUDENT_FIELDS.address.default,
};

// Tạo form cập nhật dựa trên cấu trúc BODY.UPDATE ở backend
export const DEFAULT_STUDENT_UPDATE_FORM = {
  [STUDENT_FIELDS.fullName.key]: STUDENT_FIELDS.fullName.default,
  [STUDENT_FIELDS.dateOfBirth.key]: STUDENT_FIELDS.dateOfBirth.default,
  [STUDENT_FIELDS.gender.key]: STUDENT_FIELDS.gender.default,
  [STUDENT_FIELDS.phone.key]: STUDENT_FIELDS.phone.default,
  [STUDENT_FIELDS.address.key]: STUDENT_FIELDS.address.default,
  [STUDENT_FIELDS.studentStatus.key]: STUDENT_FIELDS.studentStatus.default,
};

// Query Params mặc định khi gọi API lấy danh sách học viên
export const STUDENT_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: STUDENT_FIELDS.createdAt.key,
  sortOrder: "desc",
  [STUDENT_FIELDS.gender.key]: "",
  [STUDENT_FIELDS.studentStatus.key]: "",
};

// Tự động gom mảng Option phục vụ UI Search & Sort bar
export const STUDENT_SEARCH_OPTIONS = Object.values(STUDENT_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({ value: key, label }));

export const STUDENT_SORT_OPTIONS = Object.values(STUDENT_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({ value: key, label }));