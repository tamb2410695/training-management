export const INSTRUCTOR_FIELDS = {
  instructorId: {
    key: "instructorId",
    label: "ID Giảng viên",
    sortable: true,
  },

  instructorCode: {
    key: "instructorCode",
    label: "Mã giảng viên",
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
    default: null,
  },

  gender: {
    key: "gender",
    label: "Giới tính",
    required: { create: false, update: true },
    filterable: true,
    default: "",
  },

  specialization: {
    key: "specialization",
    label: "Chuyên môn",
    required: { create: true, update: true },
    searchable: true,
    filterable: true,
    sortable: true,
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
    default: "",
  },

  hireDate: {
    key: "hireDate",
    label: "Ngày vào làm",
    required: { create: false, update: false },
    sortable: true,
    default: null,
  },

  instructorStatus: {
    key: "instructorStatus",
    label: "Trạng thái",
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

// Cột hiển thị bảng giảng viên mặc định (Table Columns)
export const INSTRUCTOR_COLUMNS = [
  INSTRUCTOR_FIELDS.instructorCode,
  INSTRUCTOR_FIELDS.fullName,
  INSTRUCTOR_FIELDS.specialization,
  INSTRUCTOR_FIELDS.phone,
  INSTRUCTOR_FIELDS.instructorStatus,
].map(({ key, label }) => ({ key, label }));