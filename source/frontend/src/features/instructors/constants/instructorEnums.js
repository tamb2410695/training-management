export const INSTRUCTOR_STATUS = {
  ACTIVE: { CODE: "ACTIVE", LABEL: "Đang làm việc", COLOR: "green" },
  PROBATION: { CODE: "PROBATION", LABEL: "Thử việc", COLOR: "orange" },
  ON_LEAVE: { CODE: "ON_LEAVE", LABEL: "Nghỉ phép dài hạn", COLOR: "blue" },
  RESIGNED: { CODE: "RESIGNED", LABEL: "Đã nghỉ việc", COLOR: "red" },
};

export const INSTRUCTOR_GENDER = {
  MALE: { CODE: "MALE", LABEL: "Nam" },
  FEMALE: { CODE: "FEMALE", LABEL: "Nữ" },
  OTHER: { CODE: "OTHER", LABEL: "Khác" },
};

// Danh mục chuyên môn mẫu (Cái này có thể linh động theo DB hoặc cố định ở FE nếu ít thay đổi)
export const INSTRUCTOR_SPECIALIZATION = {
  IT: { CODE: "IT", LABEL: "Công nghệ thông tin" },
  ENGLISH: { CODE: "ENGLISH", LABEL: "Tiếng Anh" },
  MARKETING: { CODE: "MARKETING", LABEL: "Marketing" },
};

// Map tự động ra các UI Options cho Select box / Filter
export const INSTRUCTOR_STATUS_OPTIONS = Object.values(INSTRUCTOR_STATUS).map((status) => ({
  value: status.CODE,
  label: status.LABEL,
}));

export const INSTRUCTOR_GENDER_OPTIONS = Object.values(INSTRUCTOR_GENDER).map((gender) => ({
  value: gender.CODE,
  label: gender.LABEL,
}));

export const INSTRUCTOR_SPECIALIZATION_OPTIONS = Object.values(INSTRUCTOR_SPECIALIZATION).map((spec) => ({
  value: spec.CODE,
  label: spec.LABEL,
}));

export const INSTRUCTOR_FILTERS = {
  instructorStatus: INSTRUCTOR_STATUS_OPTIONS,
  gender: INSTRUCTOR_GENDER_OPTIONS,
  specialization: INSTRUCTOR_SPECIALIZATION_OPTIONS,
};

// Cấu hình định dạng mã (từ INSTRUCTOR_CODE của backend)
export const INSTRUCTOR_CODE_CONFIG = {
  PREFIX: "INS",
  LENGTH: 6,
};

// Bộ thông báo hệ thống thuần Việt
export const INSTRUCTOR_MESSAGES = {
  CREATE_SUCCESS: "Thêm giảng viên thành công.",
  UPDATE_SUCCESS: "Cập nhật hồ sơ giảng viên thành công.",
  DELETE_SUCCESS: "Xóa hồ sơ giảng viên thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa hồ sơ giảng viên này không?",
};