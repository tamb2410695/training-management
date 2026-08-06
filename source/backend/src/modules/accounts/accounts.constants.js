const { QUERY_COMMON_FIELDS } = require("@/constants");

const ACCOUNT_STATUS = {
  ACTIVE: "ACTIVE",
  LOCK: "LOCK",
  DISABLE: "DISABLE",
  DELETED: "DELETED",
};

const ACCOUNT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["username", "email", "roleLabel", "roleCode"],

    SORTABLE: [
      "accountId",
      "username",
      "email",
      "createdAt",
      "updatedAt",
      "roleCode",
    ],

    FILTERS: ["accountStatus", "roleCode"],

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
    CREATE: ["roleCode", "username", "email", "password"],

    UPDATE: ["username", "email", "password"],

    CHANGE_PASSWORD: ["oldPassword", "newPassword"],

    CHANGE_ROLE: ["roleCode"],
  },

  REQUIRED: {
    CREATE: ["roleCode", "username", "email", "password"],

    CHANGE_PASSWORD: ["oldPassword", "newPassword"],

    CHANGE_ROLE: ["roleCode"],
  },
};

const ACCOUNT_MAPS = {
  SEARCH: {
    username: "acc.username",
    email: "acc.email",
    roleLabel: "rl.role_label",
    roleCode: "rl.role_code",
  },

  SORT: {
    accountId: "acc.account_id",
    username: "acc.username",
    email: "acc.email",
    accountStatus: "acc.account_status",
    createdAt: "acc.created_at",
    updatedAt: "acc.updated_at",
    roleCode: "rl.role_code",
  },

  FILTER: {
    accountStatus: "acc.account_status",
    roleId: "acc.role_id",
    roleCode: "rl.role_code",
  },
};

module.exports = {
  ACCOUNT_STATUS,
  ACCOUNT_FIELDS,
  ACCOUNT_MAPS,
};
