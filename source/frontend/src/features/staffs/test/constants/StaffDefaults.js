import { ACCOUNT_FIELDS } from "./instructorFields";

export const DEFAULT_ACCOUNT_FORM = {
  [ACCOUNT_FIELDS.username.key]: ACCOUNT_FIELDS.username.default,
  [ACCOUNT_FIELDS.email.key]: ACCOUNT_FIELDS.email.default,
  [ACCOUNT_FIELDS.password.key]: ACCOUNT_FIELDS.password.default,
  [ACCOUNT_FIELDS.roleCodes.key]: ACCOUNT_FIELDS.roleCodes.default,
  [ACCOUNT_FIELDS.avatarUrl.key]: ACCOUNT_FIELDS.avatarUrl.default,
};

export const DEFAULT_ACCOUNT_UPDATE_FORM = {
  [ACCOUNT_FIELDS.username.key]: ACCOUNT_FIELDS.username.default,
  [ACCOUNT_FIELDS.email.key]: ACCOUNT_FIELDS.email.default,
  [ACCOUNT_FIELDS.avatarUrl.key]: ACCOUNT_FIELDS.avatarUrl.default,
  [ACCOUNT_FIELDS.accountStatus.key]: ACCOUNT_FIELDS.accountStatus.default,
  [ACCOUNT_FIELDS.roleCodes.key]: ACCOUNT_FIELDS.roleCodes.default,
};

export const ACCOUNT_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: ACCOUNT_FIELDS.createdAt.key,
  sortOrder: "desc",
  [ACCOUNT_FIELDS.roleCodes.key]: [],
  [ACCOUNT_FIELDS.accountStatus.key]: "",
};

export const ACCOUNT_SEARCH_OPTIONS = Object.values(ACCOUNT_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({ value: key, label }));

export const ACCOUNT_SORT_OPTIONS = Object.values(ACCOUNT_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({ value: key, label }));

// src/constants/accountDefaults.js

// export const DEFAULT_ACCOUNT_FORM = {
//   username: "",
//   email: "",
//   password: "",
//   roleCode: "STUDENT",
//   avatarUrl: "",
// };

// export const DEFAULT_ACCOUNT_UPDATE_FORM = {
//   username: "",
//   email: "",
//   avatarUrl: "",
//   accountStatus: "ACTIVE",
//   roleCode: "STUDENT",
// };

// export const ACCOUNT_QUERY_DEFAULTS = {
//   page: 1,
//   limit: 10,
//   search: "",
//   sortBy: "createdAt",
//   sortOrder: "desc",
//   roleCode: "",
//   accountStatus: "",
// };

// export const ACCOUNT_SEARCH_OPTIONS = [
//   { value: "username", label: "Tên đăng nhập" },
//   { value: "email", label: "Email" },
// ];

// export const ACCOUNT_SORT_OPTIONS = [
//   { value: "accountId", label: "Mã tài khoản" },
//   { value: "username", label: "Tên đăng nhập" },
//   { value: "email", label: "Email" },
//   { value: "accountStatus", label: "Trạng thái" },
//   { value: "createdAt", label: "Ngày tạo" },
//   { value: "updatedAt", label: "Ngày cập nhật" },
// ];