const { QUERY_COMMON_FIELDS } = require("@/constants");

// ===============================
// ACCOUNT
// ===============================

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
      "accountStatus",
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

    UPDATE: ["username", "email", "accountStatus", "roleCode"],

    CHANGE_PASSWORD: ["oldPassword", "newPassword"],
  },

  REQUIRED: {
    CREATE: ["roleCode", "username", "email", "password"],
  },
};

// ===============================
// STAFF PROFILE
// ===============================

const STAFF_PROFILE_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: [
      // staff profile
      "staffCode",
      "fullName",
      "phone",
      "personalEmail",

      // account
      "username",
      "email",
      "roleCode",
      "roleLabel",
    ],

    SORTABLE: [
      // account
      "accountId",
      "username",
      "email",
      "accountStatus",
      "createdAt",

      // staff
      "staffId",
      "staffCode",
      "fullName",
      "hireDate",
    ],

    FILTERS: ["gender", "staffStatus", "accountStatus", "roleCode"],

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

  // Internal create only
  // Không expose controller
  BODY: {
    CREATE: [
      "fullName",
      "gender",
      "dateOfBirth",
      "phone",
      "personalEmail",
      "address",
      "hireDate",
    ],

    UPDATE: [
      "fullName",
      "gender",
      "dateOfBirth",
      "phone",
      "personalEmail",
      "address",
      "hireDate",
      "staffStatus",
    ],
  },

  REQUIRED: {
    CREATE: ["fullName"],
  },
};

// ===============================
// QUERY MAP
// ===============================

const STAFF_PROFILE_MAPS = {
  SEARCH: {
    // Account
    username: "acc.username",
    email: "acc.email",
    roleCode: "rl.role_code",
    roleLabel: "rl.role_label",

    // Staff
    staffCode: "sp.staff_code",
    fullName: "sp.full_name",
    phone: "sp.phone",
    personalEmail: "sp.personal_email",
  },

  SORT: {
    // Account

    accountId: "acc.account_id",
    username: "acc.username",
    email: "acc.email",
    accountStatus: "acc.account_status",
    createdAt: "sp.created_at",

    // Staff

    staffId: "sp.staff_id",
    staffCode: "sp.staff_code",
    fullName: "sp.full_name",
    hireDate: "sp.hire_date",
  },

  FILTER: {
    // Account

    accountStatus: "acc.account_status",
    roleCode: "rl.role_code",

    // Staff

    gender: "sp.gender",
    staffStatus: "sp.staff_status",
  },
};

module.exports = {
  ACCOUNT_FIELDS,

  STAFF_PROFILE_FIELDS,
  STAFF_PROFILE_MAPS,
};
