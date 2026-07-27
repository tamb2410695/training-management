const { QUERY_COMMON_FIELDS } = require("../../constants");

const ACCOUNT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["username", "accountEmail"],
    SORTABLE: ["accountId", "username", "createdAt"],
    FILTERS: ["accountStatus"],

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
      "username",
      "accountEmail",
      "password",
      "avatarUrl",
    ],
    UPDATE: ["avatarUrl", "accountStatus"],
    CHANGE_PASSWORD: ["oldPassword", "newPassword"],
  },

  REQUIRED: {
    CREATE: ["username", "accountEmail", "password"],
  },
};

const STUDENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["studentCode", "fullName", "phone", "personalEmail"],
    SORTABLE: ["studentId", "studentCode", "fullName", "createdAt"],
    FILTERS: ["gender", "studentStatus"],

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
      "studentStatus",
    ],
  },

  REQUIRED: {
    CREATE: ["fullName", "phone"],
  },
};

const STUDENT_MAPS = {
  SEARCH: {
    username: "acc.username",
    accountEmail: "acc.email",
    studentCode: "stu.student_code",
    fullName: "stu.full_name",
    phone: "stu.phone",
    personalEmail: "stu.personal_email",
  },

  SORT: {
    accountId: "acc.account_id",
    username: "acc.username",
    createdAt: "acc.created_at",
    studentId: "stu.student_id",
    studentCode: "stu.student_code",
    fullName: "stu.full_name",
  },

  FILTER: {
    gender: "stu.gender",
    studentStatus: "stu.student_status",
    accountStatus: "acc.account_status",
  },
};

module.exports = {
  ACCOUNT_FIELDS,
  STUDENT_FIELDS,
  STUDENT_MAPS,
};