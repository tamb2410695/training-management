const { QUERY_COMMON_FIELDS } = require("../../constants");

const ACCOUNT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["username", "email"],
    SORTABLE: ["accountId", "username", "email", "createdAt", "updatedAt"],
    FILTERS: ["accountStatus", "roleName"],
    
    get ALLOWED_KEYS() {
      return [
        ...new Set([
          ...QUERY_COMMON_FIELDS.ALL_KEYS,
          ...this.SEARCHABLE,
          ...this.SORTABLE,
          ...this.FILTERS,
        ]),
      ];
    },
  },

  BODY: {
    CREATE: ["username", "email", "password", "roleName", "avatarUrl"],
    UPDATE: ["username", "email", "avatarUrl", "accountStatus", "roleName"],
  },

  REQUIRED: {
    CREATE: ["username", "email", "password", "roleName"],
    UPDATE: ["username", "email", "accountStatus", "roleName"],
  },
};

const ACCOUNT_SEARCH_MAP = {
  username: "a.username",
  email: "a.email",
};

const ACCOUNT_SORT_MAP = {
  accountId: "a.id",
  username: "a.username",
  email: "a.email",
  accountStatus: "a.account_status",
  createdAt: "a.created_at",
  updatedAt: "a.updated_at",
};

const ACCOUNT_FILTERS_MAP = {
  roleName: "r.role_name",
  accountStatus: "a.account_status",
};

module.exports = {
  ACCOUNT_FIELDS,
  ACCOUNT_SEARCH_MAP,
  ACCOUNT_SORT_MAP,
  ACCOUNT_FILTERS_MAP
};