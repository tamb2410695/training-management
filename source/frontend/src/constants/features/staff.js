export const STAFF_FIELDS = {
  staffId: {
    key: "staffId",
    label: "Mã nhân viên",
    sortable: true,
  },

  accountId: {
    key: "accountId",
    label: "Mã tài khoản",
    sortable: true,
  },

  staffCode: {
    key: "staffCode",
    label: "Mã nhân viên",
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
    required: { create: false, update: true },
    sortable: true,
    default: "",
  },

  identityCard: {
    key: "identityCard",
    label: "CCCD",
    searchable: true,
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
    label: "Email cá nhân",
    searchable: true,
    default: "",
  },

  address: {
    key: "address",
    label: "Địa chỉ",
    default: "",
  },

  academicRank: {
    key: "academicRank",
    label: "Học hàm / Học vị",
    default: "",
  },

  hireDate: {
    key: "hireDate",
    label: "Ngày tuyển dụng",
    sortable: true,
    default: "",
  },

  contractType: {
    key: "contractType",
    label: "Loại hợp đồng",
    filterable: true,
    default: "PROBATION",
  },

  staffStatus: {
    key: "staffStatus",
    label: "Trạng thái",
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

export const STAFF_COLUMNS = [
  STAFF_FIELDS.staffId,
  STAFF_FIELDS.staffCode,
  STAFF_FIELDS.fullName,
  STAFF_FIELDS.phone,
  STAFF_FIELDS.personalEmail,
  STAFF_FIELDS.contractType,
  STAFF_FIELDS.staffStatus,
].map(({ key, label }) => ({ key, label }));

export const STAFF_STATUS = {
  ACTIVE: {
    CODE: "ACTIVE",
    LABEL: "Đang làm việc",
    COLOR: "green",
  },

  ON_LEAVE: {
    CODE: "ON_LEAVE",
    LABEL: "Nghỉ phép",
    COLOR: "blue",
  },

  SUSPENDED: {
    CODE: "SUSPENDED",
    LABEL: "Tạm đình chỉ",
    COLOR: "orange",
  },

  TERMINATED: {
    CODE: "TERMINATED",
    LABEL: "Đã nghỉ việc",
    COLOR: "red",
  },

  DISABLE: {
    CODE: "DISABLE",
    LABEL: "Vô hiệu",
    COLOR: "gray",
  },
};

export const STAFF_GENDERS = {
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

export const STAFF_CONTRACT_TYPES = {
  PROBATION: {
    CODE: "PROBATION",
    LABEL: "Thử việc",
  },

  FULL_TIME: {
    CODE: "FULL_TIME",
    LABEL: "Toàn thời gian",
  },

  PART_TIME: {
    CODE: "PART_TIME",
    LABEL: "Bán thời gian",
  },
};

export const STAFF_STATUS_OPTIONS = Object.values(STAFF_STATUS).map((status) => ({
  value: status.CODE,
  label: status.LABEL,
}));

export const STAFF_GENDER_OPTIONS = Object.values(STAFF_GENDERS).map((gender) => ({
  value: gender.CODE,
  label: gender.LABEL,
}));

export const STAFF_CONTRACT_OPTIONS = Object.values(STAFF_CONTRACT_TYPES).map((type) => ({
  value: type.CODE,
  label: type.LABEL,
}));

export const STAFF_FILTERS = {
  gender: STAFF_GENDER_OPTIONS,
  contractType: STAFF_CONTRACT_OPTIONS,
  staffStatus: STAFF_STATUS_OPTIONS,
};

export const STAFF_MESSAGES = {
  CREATE_SUCCESS: "Tạo nhân viên thành công.",
  UPDATE_SUCCESS: "Cập nhật nhân viên thành công.",
  DELETE_SUCCESS: "Xóa nhân viên thành công.",
  DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa nhân viên này không?",
};



// import { STAFF_FIELDS } from "./staffFields";

export const DEFAULT_STAFF_FORM = {
  [STAFF_FIELDS.staffCode.key]: STAFF_FIELDS.staffCode.default,
  [STAFF_FIELDS.fullName.key]: STAFF_FIELDS.fullName.default,
  [STAFF_FIELDS.gender.key]: STAFF_FIELDS.gender.default,
  [STAFF_FIELDS.dateOfBirth.key]: STAFF_FIELDS.dateOfBirth.default,
  [STAFF_FIELDS.identityCard.key]: STAFF_FIELDS.identityCard.default,
  [STAFF_FIELDS.phone.key]: STAFF_FIELDS.phone.default,
  [STAFF_FIELDS.personalEmail.key]: STAFF_FIELDS.personalEmail.default,
  [STAFF_FIELDS.address.key]: STAFF_FIELDS.address.default,
  [STAFF_FIELDS.academicRank.key]: STAFF_FIELDS.academicRank.default,
  [STAFF_FIELDS.hireDate.key]: STAFF_FIELDS.hireDate.default,
  [STAFF_FIELDS.contractType.key]: STAFF_FIELDS.contractType.default,
};

export const DEFAULT_STAFF_UPDATE_FORM = {
  [STAFF_FIELDS.fullName.key]: STAFF_FIELDS.fullName.default,
  [STAFF_FIELDS.gender.key]: STAFF_FIELDS.gender.default,
  [STAFF_FIELDS.dateOfBirth.key]: STAFF_FIELDS.dateOfBirth.default,
  [STAFF_FIELDS.identityCard.key]: STAFF_FIELDS.identityCard.default,
  [STAFF_FIELDS.phone.key]: STAFF_FIELDS.phone.default,
  [STAFF_FIELDS.personalEmail.key]: STAFF_FIELDS.personalEmail.default,
  [STAFF_FIELDS.address.key]: STAFF_FIELDS.address.default,
  [STAFF_FIELDS.academicRank.key]: STAFF_FIELDS.academicRank.default,
  [STAFF_FIELDS.hireDate.key]: STAFF_FIELDS.hireDate.default,
  [STAFF_FIELDS.contractType.key]: STAFF_FIELDS.contractType.default,
  [STAFF_FIELDS.staffStatus.key]: STAFF_FIELDS.staffStatus.default,
};

export const STAFF_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: STAFF_FIELDS.createdAt.key,
  sortOrder: "desc",
  [STAFF_FIELDS.gender.key]: "",
  [STAFF_FIELDS.contractType.key]: "",
  [STAFF_FIELDS.staffStatus.key]: "",
};

export const STAFF_SEARCH_OPTIONS = Object.values(STAFF_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));

export const STAFF_SORT_OPTIONS = Object.values(STAFF_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({
    value: key,
    label,
  }));