// constants/departmentDefaults.js
import { DEPARTMENT_FIELDS } from "./departmentFields";

// Giá trị mặc định khi khởi tạo Form thêm mới phòng ban
export const DEFAULT_DEPARTMENT_FORM = {
  [DEPARTMENT_FIELDS.departmentCode.key]: DEPARTMENT_FIELDS.departmentCode.default,
  [DEPARTMENT_FIELDS.departmentName.key]: DEPARTMENT_FIELDS.departmentName.default,
};

// Giá trị mặc định khi khởi tạo Form cập nhật phòng ban (PUT/PATCH)
export const DEFAULT_DEPARTMENT_UPDATE_FORM = {
  [DEPARTMENT_FIELDS.departmentCode.key]: DEPARTMENT_FIELDS.departmentCode.default,
  [DEPARTMENT_FIELDS.departmentName.key]: DEPARTMENT_FIELDS.departmentName.default,
};

// Tham số Query mặc định phục vụ phân trang, lọc và tìm kiếm danh sách phòng ban khớp với Backend
export const DEPARTMENT_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: DEPARTMENT_FIELDS.departmentId.key, // Backend map: dpt.department_id
  sortOrder: "asc",
};

// Tự động trích xuất các trường hỗ trợ tìm kiếm từ DEPARTMENT_FIELDS (Code, Name)
export const DEPARTMENT_SEARCH_OPTIONS = Object.values(DEPARTMENT_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({ value: key, label }));

// Tự động trích xuất các trường hỗ trợ sắp xếp từ DEPARTMENT_FIELDS (Id, Code, Name)
export const DEPARTMENT_SORT_OPTIONS = Object.values(DEPARTMENT_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({ value: key, label }));