

export const DEPARTMENT_MESSAGES = {
  CREATE_SUCCESS: "Tạo phòng ban chuyên môn mới thành công.",
  UPDATE_SUCCESS: "Cập nhật thông tin phòng ban thành công.",
  DELETE_SUCCESS: "Xóa phòng ban khỏi hệ thống thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa phòng ban này? Hành động này có thể ảnh hưởng đến dữ liệu nhân sự thuộc phòng ban này.",
  
  // Thông báo đặc thù cho nghiệp vụ phân bổ nhân sự (Staff Department)
  ASSIGN_SUCCESS: "Phân phối nhân sự vào phòng ban thành công.",
  ASSIGN_DUPLICATE: "Nhân sự này đã tồn tại trong phòng ban được chọn.",
  PRIMARY_CONFLICT: "Nhân viên này đã có một phòng ban làm việc chính thức (PRIMARY).",
};

// Định nghĩa các loại hình bổ nhiệm/phân bổ dựa trên CHECK CONSTRAINT của backend
export const APPOINTMENT_TYPES = {
  PRIMARY: { CODE: "PRIMARY", LABEL: "Chính thức", COLOR: "primary" },
  PART_TIME: { CODE: "PART_TIME", LABEL: "Kiêm nhiệm/Biệt phái", COLOR: "info" },
};

export const APPOINTMENT_TYPE_OPTIONS = Object.values(APPOINTMENT_TYPES).map((type) => ({
  value: type.CODE,
  label: type.LABEL,
}));

// Cấu hình các bộ lọc (Filters) xuất hiện trên giao diện danh sách bộ phận/phòng ban
export const DEPARTMENT_FILTERS = {
  // Cho phép lọc nhân sự theo loại hình làm việc tại phòng ban (Nếu làm màn hình danh sách nhân sự theo phòng)
  appointmentType: APPOINTMENT_TYPE_OPTIONS,
};