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

  roleName: {
    key: "roleName",
    label: "Vai trò",
    required: { create: true, update: true },
    searchable: true,
    filterable: true,
    default: "",
  },

  accountStatus: {
    key: "accountStatus",
    label: "Trạng thái",
    required: { create: false, update: true },
    filterable: true,
    default: "",
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
  ACCOUNT_FIELDS.roleName,
  ACCOUNT_FIELDS.accountStatus,
].map(({ key, label }) => ({ key, label }));