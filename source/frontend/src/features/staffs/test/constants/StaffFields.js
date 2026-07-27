// constants/accountFields.js

export const ACCOUNT_FIELDS = {
  accountId: {
    key: "accountId",
    label: "Mã tài khoản",
    sortable: true,
  },

  username: {
    key: "username",
    label: "Tên đăng nhập",
    required: { create: true, update: true },
    searchable: true,
    sortable: true,
    default: "",
  },

  email: {
    key: "email",
    label: "Email",
    required: { create: true, update: true },
    searchable: true,
    sortable: true,
    default: "",
  },

  password: {
    key: "password",
    label: "Mật khẩu",
    required: { create: true, update: false },
    default: "",
  },

  roleCodes: {
    key: "roleCodes",
    label: "Vai trò",
    default: [],
    sortable: false,
    searchable: false,
  },

  roleNames: {
    key: "roleNames",
    label: "Vai trò",
    searchable: true,
    default: [],
  },

  accountStatus: {
    key: "accountStatus",
    label: "Trạng thái",
    required: { create: false, update: true },
    filterable: true,
    default: "ACTIVE",
  },

  avatarUrl: {
    key: "avatarUrl",
    label: "Ảnh đại diện",
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

export const ACCOUNT_COLUMNS = [
  ACCOUNT_FIELDS.accountId,
  ACCOUNT_FIELDS.username,
  ACCOUNT_FIELDS.email,
  {
    ...ACCOUNT_FIELDS.roleNames,
    render: (roleNames) => roleNames?.join(", ") || "N/A",
  },
  ACCOUNT_FIELDS.accountStatus,
];
