import { COURSE_FIELDS } from "./courseFields";

// Tạo form khởi tạo dựa trên cấu trúc BODY.CREATE ở backend
export const DEFAULT_COURSE_FORM = {
  [COURSE_FIELDS.courseName.key]: COURSE_FIELDS.courseName.default,
  [COURSE_FIELDS.coverImage.key]: COURSE_FIELDS.coverImage.default,
  [COURSE_FIELDS.courseDescription.key]: COURSE_FIELDS.courseDescription.default,
  [COURSE_FIELDS.durationHours.key]: COURSE_FIELDS.durationHours.default,
  [COURSE_FIELDS.totalSessions.key]: COURSE_FIELDS.totalSessions.default,
  [COURSE_FIELDS.tuitionFee.key]: COURSE_FIELDS.tuitionFee.default,
  [COURSE_FIELDS.level.key]: COURSE_FIELDS.level.default,
  [COURSE_FIELDS.certificateAvailable.key]: COURSE_FIELDS.certificateAvailable.default,
  [COURSE_FIELDS.courseStatus.key]: COURSE_FIELDS.courseStatus.default,
};

// Form cập nhật (Dựa trên cấu trúc BODY.UPDATE ở backend)
export const DEFAULT_COURSE_UPDATE_FORM = { ...DEFAULT_COURSE_FORM };

// Các tham số Query API mặc định
export const COURSE_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: COURSE_FIELDS.createdAt.key,
  sortOrder: "desc",
  [COURSE_FIELDS.courseStatus.key]: "",
  [COURSE_FIELDS.level.key]: "",
  [COURSE_FIELDS.certificateAvailable.key]: "",
};

// Trích xuất các option tìm kiếm và sắp xếp cho thanh công cụ UI
export const COURSE_SEARCH_OPTIONS = Object.values(COURSE_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({ value: key, label }));

export const COURSE_SORT_OPTIONS = Object.values(COURSE_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({ value: key, label }));