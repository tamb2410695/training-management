export const COURSE_STATUS = {
  DRAFT: { CODE: "DRAFT", LABEL: "Bản nháp", COLOR: "gray" },
  ACTIVE: { CODE: "ACTIVE", LABEL: "Đang tuyển sinh", COLOR: "green" },
  RUNNING: { CODE: "RUNNING", LABEL: "Đang giảng dạy", COLOR: "blue" },
  CLOSED: { CODE: "CLOSED", LABEL: "Đã đóng", COLOR: "red" },
};

export const COURSE_LEVELS = {
  BEGINNER: { CODE: "BEGINNER", LABEL: "Cơ bản" },
  INTERMEDIATE: { CODE: "INTERMEDIATE", LABEL: "Trung cấp" },
  ADVANCED: { CODE: "ADVANCED", LABEL: "Nâng cao" },
};

export const CERTIFICATE_OPTIONS = [
  { value: true, label: "Có chứng chỉ" },
  { value: false, label: "Không cấp chứng chỉ" },
];

// Tạo danh sách Options phục vụ UI Select box/Dropdown
export const COURSE_STATUS_OPTIONS = Object.values(COURSE_STATUS).map((status) => ({
  value: status.CODE,
  label: status.LABEL,
}));

export const COURSE_LEVEL_OPTIONS = Object.values(COURSE_LEVELS).map((level) => ({
  value: level.CODE,
  label: level.LABEL,
}));

export const COURSE_FILTERS = {
  courseStatus: COURSE_STATUS_OPTIONS,
  level: COURSE_LEVEL_OPTIONS,
  certificateAvailable: CERTIFICATE_OPTIONS,
};

// Đồng bộ định dạng mã tự động với Backend
export const COURSE_CODE_CONFIG = {
  PREFIX: "CRS",
  LENGTH: 6,
};

// Nội dung thông báo hệ thống
export const COURSE_MESSAGES = {
  CREATE_SUCCESS: "Tạo khóa học thành công.",
  UPDATE_SUCCESS: "Cập nhật khóa học thành công.",
  DELETE_SUCCESS: "Xóa khóa học thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa khóa học này không?",
};