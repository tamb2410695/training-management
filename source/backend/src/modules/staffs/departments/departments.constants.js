const { QUERY_COMMON_FIELDS } = require("../../../constants");

const ACCOUNT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["username", "email"],

    SORTABLE: ["accountId", "username", "createdAt"],

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
    CREATE: [
      "roleCode",
      "username",
      "email",
      "password",
      "avatarUrl",
      "accountStatus",
    ],
    UPDATE: ["roleCode", "avatarUrl", "accountStatus"],
    CHANGE_PASSWORD: ["oldPassword", "newPassword"],
  },

  REQUIRED: {
    CREATE: ["roleCode", "username", "email", "password"],
  },
};

const STAFF_DEPARTMENT_FIELDS = {
  PARAMS: {
    STAFF_ID: ["staffId"],
    DEPARTMENT_ID: ["departmentId"],
  },

  QUERY: {
    SEARCHABLE: [],

    SORTABLE: [
      "assignedAt",
      "updatedAt",
    ],

    FILTERS: [
      "staffId",
      "departmentId",
      "appointmentType",
    ],

    get ALLOWED_KEYS() {
      return [
        ...new Set([
          ...QUERY_COMMON_FIELDS.ALL_KEYS,
          ...this.SORTABLE,
          ...this.FILTERS,
        ]),
      ];
    },
  },

  BODY: {
    CREATE: [
      "staffId",
      "departmentId",
      "appointmentType",
      "assignedAt",
    ],
  },

  REQUIRED: {
    CREATE: [
      "staffId",
      "departmentId",
      "assignedAt",
    ],
  },
};

const STAFF_DEPARTMENT_MAPS = {
  SEARCH: {},

  SORT: {
    assignedAt: "sd.assigned_at",
    updatedAt: "sd.updated_at",
  },

  FILTER: {
    staffId: "sd.staff_id",
    departmentId: "sd.department_id",
    appointmentType: "sd.appointment_type",
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
    createdAt: "acc.created_at",
  },
  FILTER: {
    accountStatus: "acc.account_status",
    roleCode: "acc.role_id",
  },
};

module.exports = {
  STAFF_DEPARTMENT_FIELDS,
  STAFF_DEPARTMENT_MAPS,
};
