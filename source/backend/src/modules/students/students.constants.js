const { QUERY_COMMON_FIELDS } = require("@/constants");
const { ACCOUNT_FIELDS } = require("../accounts");

const STUDENT_PROFILE_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: [
      "studentCode",
      "fullName",
      "phone",
      "personalEmail",

      "username",
      "email",
      "roleLabel",
      "roleCode",
    ],

    SORTABLE: [
      "studentId",
      "studentCode",
      "fullName",

      "username",

      "createdAt",
      "updatedAt",
    ],

    FILTERS: ["gender", "studentStatus", "accountStatus", "roleCode"],

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
      "phone",
      "personalEmail",
      "address",
    ],

    UPDATE: [
      "fullName",
      "gender",
      "dateOfBirth",
      "phone",
      "personalEmail",
      "address",
    ],
  },

  REQUIRED: {
    CREATE: ["fullName", "dateOfBirth"],
  },
};

const STUDENT_PROFILE_MAPS = {
  SEARCH: {
    username: "acc.username",

    email: "acc.email",

    roleLabel: "rl.role_label",

    roleCode: "rl.role_code",

    studentCode: "stu.student_code",

    fullName: "stu.full_name",

    phone: "stu.phone",

    personalEmail: "stu.personal_email",
  },

  SORT: {
    accountId: "acc.account_id",

    username: "acc.username",

    email: "acc.email",

    studentId: "stu.student_id",

    studentCode: "stu.student_code",

    fullName: "stu.full_name",

    createdAt: "stu.created_at",

    updatedAt: "stu.updated_at",
  },

  FILTER: {
    accountStatus: "acc.account_status",

    roleCode: "rl.role_code",

    gender: "stu.gender",

    studentStatus: "stu.student_status",
  },
};

module.exports = {
  ACCOUNT_FIELDS,

  STUDENT_PROFILE_FIELDS,

  STUDENT_PROFILE_MAPS,
};
