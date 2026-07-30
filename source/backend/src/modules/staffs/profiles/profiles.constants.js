const { QUERY_COMMON_FIELDS } = require("../../../constants");

const ACCOUNT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["username", "accountEmail", "roleLabel"],

    SORTABLE: ["accountId", "username", "createdAt", "roleCode"],

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
      "accountEmail",
      "password",
      "avatarUrl",
    ],
    UPDATE: ["roleCode", "avatarUrl", "accountStatus"],
    CHANGE_PASSWORD: ["oldPassword", "newPassword"],
  },

  REQUIRED: {
    CREATE: ["roleCode", "username", "accountEmail", "password"],
  },
};


const STAFF_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["staffCode", "fullName", "phone", "personalEmail"],

    SORTABLE: ["staffId", "staffCode", "fullName", "hireDate", "createdAt"],

    FILTERS: ["gender", "contractType", "staffStatus", "departmentId"],

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
      "fullName",
      "gender",
      "dateOfBirth",
      "identityCard",
      "phone",
      "personalEmail",
      "address",
      "academicRank",
      "hireDate",
      "contractType",
    ],

    UPDATE: [
      "fullName",
      "gender",
      "dateOfBirth",
      "identityCard",
      "phone",
      "personalEmail",
      "hireDate",
      "address",
      "academicRank",
      "contractType",
      "staffStatus",
    ],
  },

  REQUIRED: {
    CREATE: ["fullName", "phone"],
  },
};

const STAFF_MAPS = {
  SEARCH: {
    username: "acc.username",
    accountEmail: "acc.email",
    roleLabel: "rl.role_label",
    staffCode: "sp.staff_code",
    fullName: "sp.full_name",
    phone: "sp.phone",
    personalEmail: "sp.personal_email",
  },

  SORT: {
    accountId: "acc.account_id",
    username: "acc.username",
    createdAt: "acc.created_at",
    roleLabel: "rl.role_code",
    staffId: "sp.staff_id",
    staffCode: "sp.staff_code",
    fullName: "sp.full_name",
    hireDate: "sp.hire_date",
    createdAt: "sp.created_at",
  },

  FILTER: {
    accountStatus: "acc.account_status",
    roleCode: "acc.role_id",
    gender: "sp.gender",
    contractType: "sp.contract_type",
    staffStatus: "sp.staff_status",
    departmentId: "sd.department_id",
  },
};

module.exports = {
  ACCOUNT_FIELDS,
  STAFF_FIELDS,
  STAFF_MAPS,
};
