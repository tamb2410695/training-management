export const CLASS_FIELDS = {
  classId: {
    key: "classId",
    label: "Mã lớp học",
    sortable: true,
  },

  classCode: {
    key: "classCode",
    label: "Mã lớp học",
    required: { create: true, update: false },
    searchable: true,
    sortable: true,
    default: "",
  },

  courseId: {
    key: "courseId",
    label: "Khóa học",
    required: { create: true, update: true },
    default: null,
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
    searchable: true,
    sortable: true,
  },

  startDate: {
    key: "startDate",
    label: "Ngày bắt đầu",
    required: { create: true, update: true },
    sortable: true,
    default: "",
  },

  endDate: {
    key: "endDate",
    label: "Ngày kết thúc",
    required: { create: true, update: true },
    sortable: true,
    default: "",
  },

  maxStudents: {
    key: "maxStudents",
    label: "Số lượng tối đa",
    required: { create: true, update: true },
    sortable: true,
    default: 0,
  },

  classStatus: {
    key: "classStatus",
    label: "Trạng thái",
    required: { create: false, update: true },
    filterable: true,
    default: "PENDING",
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

export const CLASS_COLUMNS = [
  CLASS_FIELDS.classCode,
  CLASS_FIELDS.courseCode,
  CLASS_FIELDS.courseName,
  CLASS_FIELDS.startDate,
  CLASS_FIELDS.endDate,
  CLASS_FIELDS.maxStudents,
  CLASS_FIELDS.classStatus,
].map(({ key, label }) => ({
  key,
  label,
}));


export const CLASS_STATUS = {
  PENDING: {
    CODE: "PENDING",
    LABEL: "Chờ mở",
    COLOR: "orange",
  },

  OPEN_REGISTRATION: {
    CODE: "OPEN_REGISTRATION",
    LABEL: "Đang tuyển sinh",
    COLOR: "blue",
  },

  ONGOING: {
    CODE: "ONGOING",
    LABEL: "Đang học",
    COLOR: "green",
  },

  COMPLETED: {
    CODE: "COMPLETED",
    LABEL: "Hoàn thành",
    COLOR: "cyan",
  },

  DELETED: {
    CODE: "DELETED",
    LABEL: "Đã xóa",
    COLOR: "red",
  },
};


export const CLASS_STATUS_OPTIONS = Object.values(CLASS_STATUS).map(
  ({ CODE, LABEL }) => ({
    value: CODE,
    label: LABEL,
  })
);

export const CLASS_FILTERS = {
  classStatus: CLASS_STATUS_OPTIONS,
};

export const CLASS_MESSAGES = {
  CREATE_SUCCESS: "Tạo lớp học thành công.",

  UPDATE_SUCCESS: "Cập nhật lớp học thành công.",

  DELETE_SUCCESS: "Xóa lớp học thành công.",

  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa lớp học này không?",

  OPEN_REGISTRATION_SUCCESS: "Mở đăng ký lớp học thành công.",

  CLOSE_REGISTRATION_SUCCESS: "Đóng đăng ký lớp học thành công.",

  START_SUCCESS: "Bắt đầu lớp học thành công.",

  COMPLETE_SUCCESS: "Hoàn thành lớp học thành công.",
};


// import { CLASS_FIELDS } from "./classFields";

export const DEFAULT_CLASS_FORM = {
  [CLASS_FIELDS.classCode.key]: CLASS_FIELDS.classCode.default,

  [CLASS_FIELDS.courseId.key]: CLASS_FIELDS.courseId.default,

  [CLASS_FIELDS.startDate.key]: CLASS_FIELDS.startDate.default,

  [CLASS_FIELDS.endDate.key]: CLASS_FIELDS.endDate.default,

  [CLASS_FIELDS.maxStudents.key]: CLASS_FIELDS.maxStudents.default,
};

export const DEFAULT_CLASS_UPDATE_FORM = {
  [CLASS_FIELDS.courseId.key]: CLASS_FIELDS.courseId.default,

  [CLASS_FIELDS.startDate.key]: CLASS_FIELDS.startDate.default,

  [CLASS_FIELDS.endDate.key]: CLASS_FIELDS.endDate.default,

  [CLASS_FIELDS.maxStudents.key]: CLASS_FIELDS.maxStudents.default,

  [CLASS_FIELDS.classStatus.key]: CLASS_FIELDS.classStatus.default,
};

export const CLASS_QUERY_DEFAULTS = {
  page: 1,

  limit: 10,

  search: "",

  sortBy: CLASS_FIELDS.createdAt.key,

  sortOrder: "desc",

  [CLASS_FIELDS.classStatus.key]: "",
};

export const CLASS_SEARCH_OPTIONS = Object.values(CLASS_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));

export const CLASS_SORT_OPTIONS = Object.values(CLASS_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));