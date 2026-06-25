export const STUDENT_FIELDS = {
  studentId: {
    key: "studentId",
    label: "ID Học viên",
    sortable: true,
  },

  studentCode: {
    key: "studentCode",
    label: "Mã học viên",
    searchable: true,
    sortable: true,
  },

  fullName: {
    key: "fullName",
    label: "Họ và tên",
    required: { create: true, update: true },
    searchable: true,
    sortable: true,
    default: "",
  },

  dateOfBirth: {
    key: "dateOfBirth",
    label: "Ngày sinh",
    required: { create: true, update: true },
    sortable: true,
    default: null, // Hoặc "" tùy thuộc vào thư viện DatePicker bạn dùng
  },

  gender: {
    key: "gender",
    label: "Giới tính",
    required: { create: false, update: true },
    filterable: true,
    default: "",
  },

  phone: {
    key: "phone",
    label: "Số điện thoại",
    required: { create: true, update: true },
    searchable: true,
    default: "",
  },

  address: {
    key: "address",
    label: "Địa chỉ",
    searchable: true,
    default: "",
  },

  studentStatus: {
    key: "studentStatus",
    label: "Trạng thái học viên",
    required: { create: false, update: true },
    filterable: true,
    sortable: true,
    default: "",
  },

  createdAt: {
    key: "createdAt",
    label: "Ngày tạo",
    sortable: true,
  },

  updatedAt: {
    key: "updatedAt",
    label: "Ngày cập nhật",
    sortable: true,
  },
};

// Cột hiển thị bảng học viên mặc định (Table Columns)
export const STUDENT_COLUMNS = [
  STUDENT_FIELDS.studentCode,
  STUDENT_FIELDS.fullName,
  STUDENT_FIELDS.phone,
  STUDENT_FIELDS.studentStatus,
].map(({ key, label }) => ({ key, label }));