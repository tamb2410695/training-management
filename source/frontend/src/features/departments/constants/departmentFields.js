// constants/departmentFields.js

export const DEPARTMENT_FIELDS = {
  departmentId: {
    key: "departmentId",
    label: "Mã định danh",
    sortable: true,
  },

  departmentCode: {
    key: "departmentCode",
    label: "Mã phòng ban",
    required: { create: true, update: true },
    searchable: true,
    sortable: true,
    default: "",
  },

  departmentName: {
    key: "departmentName",
    label: "Tên phòng ban",
    required: { create: true, update: true },
    searchable: true,
    sortable: true,
    default: "",
  },
};

// Cấu hình các cột hiển thị trên Table danh sách phòng ban
export const DEPARTMENT_COLUMNS = [
  DEPARTMENT_FIELDS.departmentId,
  DEPARTMENT_FIELDS.departmentCode,
  DEPARTMENT_FIELDS.departmentName,
];