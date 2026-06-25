export const STUDENT_STATUS = {
  STUDYING: { CODE: "STUDYING", LABEL: "Đang học", COLOR: "blue" },
  RESERVED: { CODE: "RESERVED", LABEL: "Bảo lưu", COLOR: "orange" },
  GRADUATED: { CODE: "GRADUATED", LABEL: "Đã tốt nghiệp", COLOR: "green" },
  DROPPED: { CODE: "DROPPED", LABEL: "Thôi học", COLOR: "red" },
};

export const STUDENT_GENDER = {
  MALE: { CODE: "MALE", LABEL: "Nam" },
  FEMALE: { CODE: "FEMALE", LABEL: "Nữ" },
  OTHER: { CODE: "OTHER", LABEL: "Khác" },
};

// Map tự động ra các UI Options cho Select box
export const STUDENT_STATUS_OPTIONS = Object.values(STUDENT_STATUS).map((status) => ({
  value: status.CODE,
  label: status.LABEL,
}));

export const STUDENT_GENDER_OPTIONS = Object.values(STUDENT_GENDER).map((gender) => ({
  value: gender.CODE,
  label: gender.LABEL,
}));

export const STUDENT_FILTERS = {
  studentStatus: STUDENT_STATUS_OPTIONS,
  gender: STUDENT_GENDER_OPTIONS,
};

// Cấu hình mã định dạng học viên (từ STUDENT_CODE của backend)
export const STUDENT_CODE_CONFIG = {
  PREFIX: "STU",
  LENGTH: 6,
};

// Thông báo tiếng Việt đồng bộ hệ thống
export const STUDENT_MESSAGES = {
  CREATE_SUCCESS: "Thêm học viên thành công.",
  UPDATE_SUCCESS: "Cập nhật thông tin học viên thành công.",
  DELETE_SUCCESS: "Xóa hồ sơ học viên thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa hồ sơ học viên này?",
};