export const COURSE_FIELDS = {
  courseId: {
    key: "courseId",
    label: "ID Khóa học",
    sortable: true,
  },

  courseCode: {
    key: "courseCode",
    label: "Mã khóa học",
    searchable: true,
    sortable: true,
  },

  courseName: {
    key: "courseName",
    label: "Tên khóa học",
    required: { create: true, update: true },
    searchable: true,
    sortable: true,
    default: "",
  },

  coverImage: {
    key: "coverImage",
    label: "Ảnh bọc khóa học",
    default: "",
  },

  courseDescription: {
    key: "courseDescription",
    label: "Mô tả khóa học",
    searchable: true,
    default: "",
  },

  durationHours: {
    key: "durationHours",
    label: "Thời lượng (Giờ)",
    required: { create: true, update: true },
    sortable: true,
    default: 0,
  },

  totalSessions: {
    key: "totalSessions",
    label: "Tổng số buổi",
    required: { create: true, update: true },
    sortable: true,
    default: 0,
  },

  tuitionFee: {
    key: "tuitionFee",
    label: "Học phí",
    sortable: true,
    default: 0,
  },

  level: {
    key: "level",
    label: "Trình độ",
    required: { create: false, update: true },
    filterable: true,
    sortable: true,
    default: "",
  },

  certificateAvailable: {
    key: "certificateAvailable",
    label: "Cấp chứng chỉ",
    required: { create: false, update: true },
    filterable: true,
    default: false,
  },

  courseStatus: {
    key: "courseStatus",
    label: "Trạng thái",
    required: { create: false, update: true },
    filterable: true,
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

// Cột cấu hình cho Table hiển thị danh sách khóa học
export const COURSE_COLUMNS = [
  COURSE_FIELDS.courseCode,
  COURSE_FIELDS.courseName,
  COURSE_FIELDS.tuitionFee,
  COURSE_FIELDS.level,
  COURSE_FIELDS.courseStatus,
].map(({ key, label }) => ({ key, label }));