export const COURSE_FIELDS = {
  courseId: {
    key: "courseId",
    label: "Mã khóa học",
    sortable: true,
  },

  courseCode: {
    key: "courseCode",
    label: "Mã khóa học",
    required: { create: true, update: false },
    searchable: true,
    sortable: true,
    default: "",
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
    label: "Ảnh bìa",
    default: "",
  },

  courseDescription: {
    key: "courseDescription",
    label: "Mô tả",
    default: "",
  },

  durationHours: {
    key: "durationHours",
    label: "Tổng số giờ",
    required: { create: true, update: true },
    sortable: true,
    default: 0,
  },

  totalSessions: {
    key: "totalSessions",
    label: "Số buổi học",
    required: { create: true, update: true },
    sortable: true,
    default: 0,
  },

  tuitionFee: {
    key: "tuitionFee",
    label: "Học phí",
    required: { create: true, update: true },
    sortable: true,
    default: 0,
  },

  courseLevel: {
    key: "courseLevel",
    label: "Trình độ",
    required: { create: true, update:true },
    filterable: true,
    default: "BEGINNER",
  },

  certificateAvailable: {
    key: "certificateAvailable",
    label: "Có chứng chỉ",
    filterable: true,
    default: true,
  },

  courseStatus: {
    key: "courseStatus",
    label: "Trạng thái",
    required: { create: false, update: true },
    filterable: true,
    default: "ACTIVE",
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

export const COURSE_COLUMNS = [
  COURSE_FIELDS.courseCode,
  COURSE_FIELDS.courseName,
  COURSE_FIELDS.durationHours,
  COURSE_FIELDS.totalSessions,
  COURSE_FIELDS.tuitionFee,
  COURSE_FIELDS.courseLevel,
  COURSE_FIELDS.courseStatus,
].map(({ key, label }) => ({
  key,
  label,
}));

export const COURSE_LEVELS = {
  BEGINNER: {
    CODE: "BEGINNER",
    LABEL: "Cơ bản",
  },

  INTERMEDIATE: {
    CODE: "INTERMEDIATE",
    LABEL: "Trung cấp",
  },

  ADVANCED: {
    CODE: "ADVANCED",
    LABEL: "Nâng cao",
  },
};

export const COURSE_STATUS = {
  PENDING: {
    CODE: "PENDING",
    LABEL: "Chờ duyệt",
    COLOR: "orange",
  },

  ACTIVE: {
    CODE: "ACTIVE",
    LABEL: "Đang hoạt động",
    COLOR: "green",
  },

  LOCKED: {
    CODE: "LOCKED",
    LABEL: "Đã khóa",
    COLOR: "red",
  },

  DISABLED: {
    CODE: "DISABLED",
    LABEL: "Vô hiệu hóa",
    COLOR: "gray",
  },

  DELETED: {
    CODE: "DELETED",
    LABEL: "Đã xóa",
    COLOR: "black",
  },
};

export const COURSE_LEVEL_OPTIONS = Object.values(COURSE_LEVELS).map(
  ({ CODE, LABEL }) => ({
    value: CODE,
    label: LABEL,
  })
);

export const COURSE_STATUS_OPTIONS = Object.values(COURSE_STATUS).map(
  ({ CODE, LABEL }) => ({
    value: CODE,
    label: LABEL,
  })
);

export const CERTIFICATE_AVAILABLE_OPTIONS = [
  {
    value: true,
    label: "Có",
  },
  {
    value: false,
    label: "Không",
  },
];

export const COURSE_FILTERS = {
  courseLevel: COURSE_LEVEL_OPTIONS,
  courseStatus: COURSE_STATUS_OPTIONS,
  certificateAvailable: CERTIFICATE_AVAILABLE_OPTIONS,
};

export const COURSE_MESSAGES = {
  CREATE_SUCCESS: "Tạo khóa học thành công.",

  UPDATE_SUCCESS: "Cập nhật khóa học thành công.",

  DELETE_SUCCESS: "Xóa khóa học thành công.",

  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa khóa học này không?",

  PUBLISH_SUCCESS: "Xuất bản khóa học thành công.",

  LOCK_SUCCESS: "Khóa khóa học thành công.",
};

// import { COURSE_FIELDS } from "./courseFields";

export const DEFAULT_COURSE_FORM = {
  [COURSE_FIELDS.courseCode.key]: COURSE_FIELDS.courseCode.default,

  [COURSE_FIELDS.courseName.key]: COURSE_FIELDS.courseName.default,

  [COURSE_FIELDS.coverImage.key]: COURSE_FIELDS.coverImage.default,

  [COURSE_FIELDS.courseDescription.key]:
    COURSE_FIELDS.courseDescription.default,

  [COURSE_FIELDS.durationHours.key]:
    COURSE_FIELDS.durationHours.default,

  [COURSE_FIELDS.totalSessions.key]:
    COURSE_FIELDS.totalSessions.default,

  [COURSE_FIELDS.tuitionFee.key]:
    COURSE_FIELDS.tuitionFee.default,

  [COURSE_FIELDS.courseLevel.key]:
    COURSE_FIELDS.courseLevel.default,

  [COURSE_FIELDS.certificateAvailable.key]:
    COURSE_FIELDS.certificateAvailable.default,
};

export const DEFAULT_COURSE_UPDATE_FORM = {
  [COURSE_FIELDS.courseName.key]: COURSE_FIELDS.courseName.default,

  [COURSE_FIELDS.coverImage.key]: COURSE_FIELDS.coverImage.default,

  [COURSE_FIELDS.courseDescription.key]:
    COURSE_FIELDS.courseDescription.default,

  [COURSE_FIELDS.durationHours.key]:
    COURSE_FIELDS.durationHours.default,

  [COURSE_FIELDS.totalSessions.key]:
    COURSE_FIELDS.totalSessions.default,

  [COURSE_FIELDS.tuitionFee.key]:
    COURSE_FIELDS.tuitionFee.default,

  [COURSE_FIELDS.courseLevel.key]:
    COURSE_FIELDS.courseLevel.default,

  [COURSE_FIELDS.certificateAvailable.key]:
    COURSE_FIELDS.certificateAvailable.default,

  [COURSE_FIELDS.courseStatus.key]:
    COURSE_FIELDS.courseStatus.default,
};

export const COURSE_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: COURSE_FIELDS.createdAt.key,
  sortOrder: "desc",

  [COURSE_FIELDS.courseLevel.key]: "",

  [COURSE_FIELDS.courseStatus.key]: "",

  [COURSE_FIELDS.certificateAvailable.key]: "",
};

export const COURSE_SEARCH_OPTIONS = Object.values(COURSE_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));

export const COURSE_SORT_OPTIONS = Object.values(COURSE_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));