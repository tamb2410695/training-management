import { ACCOUNT_FIELDS } from "./accountFields";

export const DEFAULT_ACCOUNT_FORM = {
  [ACCOUNT_FIELDS.username.key]: ACCOUNT_FIELDS.username.default,
  [ACCOUNT_FIELDS.email.key]: ACCOUNT_FIELDS.email.default,
  [ACCOUNT_FIELDS.password.key]: ACCOUNT_FIELDS.password.default,
  [ACCOUNT_FIELDS.roleName.key]: ACCOUNT_FIELDS.roleName.default,
  [ACCOUNT_FIELDS.avatarUrl.key]: ACCOUNT_FIELDS.avatarUrl.default,
};

export const DEFAULT_ACCOUNT_UPDATE_FORM = {
  [ACCOUNT_FIELDS.username.key]: ACCOUNT_FIELDS.username.default,
  [ACCOUNT_FIELDS.email.key]: ACCOUNT_FIELDS.email.default,
  [ACCOUNT_FIELDS.avatarUrl.key]: ACCOUNT_FIELDS.avatarUrl.default,
  [ACCOUNT_FIELDS.accountStatus.key]: ACCOUNT_FIELDS.accountStatus.default,
  [ACCOUNT_FIELDS.roleName.key]: ACCOUNT_FIELDS.roleName.default,
};

export const ACCOUNT_QUERY_DEFAULTS = {
  page: 1,
  limit: 10,
  search: "",
  sortBy: ACCOUNT_FIELDS.createdAt.key,
  sortOrder: "desc",
  [ACCOUNT_FIELDS.roleName.key]: "",
  [ACCOUNT_FIELDS.accountStatus.key]: "",
};

export const ACCOUNT_SEARCH_OPTIONS = Object.values(ACCOUNT_FIELDS)
  .filter((field) => field.searchable)
  .map(({ key, label }) => ({ value: key, label }));

export const ACCOUNT_SORT_OPTIONS = Object.values(ACCOUNT_FIELDS)
  .filter((field) => field.sortable)
  .map(({ key, label }) => ({ value: key, label }));