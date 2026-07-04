const { QUERY_COMMON_FIELDS } = require("../../constants");

const ACCOUNT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["username", "email"],

    SORTABLE: [
      "accountId",
      "username",
      "email",
      "accountStatus",
      "createdAt",
      "updatedAt",
    ],

    FILTERS: ["accountStatus", "roleCodes", "roleCode", "roleNames"],

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
    CREATE: ["username", "email", "password", "roleCode", "avatarUrl"],
    UPDATE: ["username", "email", "avatarUrl", "accountStatus", "roleCode"],
  },

  REQUIRED: {
    CREATE: ["username", "email", "password", "roleCode"],
    UPDATE: ["username", "email", "accountStatus", "roleCode"],
  },
};

const ACCOUNT_MAPS = {
  SEARCH: {
    username: "acc.username",
    email: "acc.email",
  },

  SORT: {
    accountId: "acc.account_id",
    username: "acc.username",
    email: "acc.email",
    accountStatus: "acc.account_status",
    createdAt: "acc.created_at",
    updatedAt: "acc.updated_at",
  },

  FILTER: {
    accountStatus: "acc.account_status",
    roleId: "ur.role_id",
  },
};

module.exports = {
  ACCOUNT_FIELDS,
  ACCOUNT_MAPS,
};
