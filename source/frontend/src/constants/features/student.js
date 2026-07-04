export const STUDENT_FIELDS = {
  studentId: {
    key: "studentId",
    label: "Mã học viên",
    sortable: true,
  },

  accountId: {
    key: "accountId",
    label: "Mã tài khoản",
    sortable: true,
  },

  studentCode: {
    key: "studentCode",
    label: "Mã học viên",
    required: { create: true, update: false },
    searchable: true,
    sortable: true,
    default: "",
  },

  fullName: {
    key: "fullName",
    label: "Họ và tên",
    required: { create: true, update: true },
    searchable: true,
    sortable: true,
    default: "",
  },

  gender: {
    key: "gender",
    label: "Giới tính",
    required: { create: true, update: true },
    filterable: true,
    default: "OTHER",
  },

  dateOfBirth: {
    key: "dateOfBirth",
    label: "Ngày sinh",
    required: { create: true, update: true },
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

  personalEmail: {
    key: "personalEmail",
    label: "Email",
    required: { create: true, update: true },
    searchable: true,
    sortable: true,
    default: "",
  },

  address: {
    key: "address",
    label: "Địa chỉ",
    required: { create: false, update: true },
    default: "",
  },

  studentStatus: {
    key: "studentStatus",
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

export const STUDENT_COLUMNS = [
  STUDENT_FIELDS.studentId,
  STUDENT_FIELDS.studentCode,
  STUDENT_FIELDS.fullName,
  STUDENT_FIELDS.phone,
  STUDENT_FIELDS.personalEmail,
  STUDENT_FIELDS.studentStatus,
].map(({ key, label }) => ({ key, label }));

export const STUDENT_STATUS = {
  INCOMPLETE: {
    CODE: "INCOMPLETE",
    LABEL: "Chưa hoàn tất",
    COLOR: "orange",
  },

  ACTIVE: {
    CODE: "ACTIVE",
    LABEL: "Đang học",
    COLOR: "green",
  },

  SUSPENDED: {
    CODE: "SUSPENDED",
    LABEL: "Tạm ngưng",
    COLOR: "volcano",
  },

  GRADUATED: {
    CODE: "GRADUATED",
    LABEL: "Đã tốt nghiệp",
    COLOR: "blue",
  },

  WITHDRAWN: {
    CODE: "WITHDRAWN",
    LABEL: "Đã thôi học",
    COLOR: "red",
  },
};

export const STUDENT_GENDERS = {
  MALE: {
    CODE: "MALE",
    LABEL: "Nam",
  },

  FEMALE: {
    CODE: "FEMALE",
    LABEL: "Nữ",
  },

  OTHER: {
    CODE: "OTHER",
    LABEL: "Khác",
  },
};

export const STUDENT_STATUS_OPTIONS = Object.values(STUDENT_STATUS).map((status) => ({
  value: status.CODE,
  label: status.LABEL,
}));

export const STUDENT_GENDER_OPTIONS = Object.values(STUDENT_GENDERS).map((gender) => ({
  value: gender.CODE,
  label: gender.LABEL,
}));

export const STUDENT_FILTERS = {
  gender: STUDENT_GENDER_OPTIONS,
  studentStatus: STUDENT_STATUS_OPTIONS,
};

export const STUDENT_MESSAGES = {
  CREATE_SUCCESS: "Tạo học viên thành công.",
  UPDATE_SUCCESS: "Cập nhật học viên thành công.",
  DELETE_SUCCESS: "Xóa học viên thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa học viên này không?",
};


// import { STUDENT_FIELDS } from "./studentFields";

export const DEFAULT_STUDENT_FORM = {
  [STUDENT_FIELDS.studentCode.key]: STUDENT_FIELDS.studentCode.default,
  [STUDENT_FIELDS.fullName.key]: STUDENT_FIELDS.fullName.default,
  [STUDENT_FIELDS.gender.key]: STUDENT_FIELDS.gender.default,
  [STUDENT_FIELDS.dateOfBirth.key]: STUDENT_FIELDS.dateOfBirth.default,
  [STUDENT_FIELDS.phone.key]: STUDENT_FIELDS.phone.default,
  [STUDENT_FIELDS.personalEmail.key]: STUDENT_FIELDS.personalEmail.default,
  [STUDENT_FIELDS.address.key]: STUDENT_FIELDS.address.default,
};

export const DEFAULT_STUDENT_UPDATE_FORM = {
  [STUDENT_FIELDS.fullName.key]: STUDENT_FIELDS.fullName.default,
  [STUDENT_FIELDS.gender.key]: STUDENT_FIELDS.gender.default,
  [STUDENT_FIELDS.dateOfBirth.key]: STUDENT_FIELDS.dateOfBirth.default,
  [STUDENT_FIELDS.phone.key]: STUDENT_FIELDS.phone.default,
  [STUDENT_FIELDS.personalEmail.key]: STUDENT_FIELDS.personalEmail.default,
  [STUDENT_FIELDS.address.key]: STUDENT_FIELDS.address.default,
  [STUDENT_FIELDS.studentStatus.key]: STUDENT_FIELDS.studentStatus.default,
};

export const STUDENT_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: STUDENT_FIELDS.createdAt.key,
  sortOrder: "desc",
  [STUDENT_FIELDS.gender.key]: "",
  [STUDENT_FIELDS.studentStatus.key]: "",
};

export const STUDENT_SEARCH_OPTIONS = Object.values(STUDENT_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));

export const STUDENT_SORT_OPTIONS = Object.values(STUDENT_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));