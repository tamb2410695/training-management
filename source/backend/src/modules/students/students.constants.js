const { QUERY_COMMON_FIELDS } = require("../../constants");

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
      "accountId",
      "studentCode",
      "fullName",
      "gender",
      "dateOfBirth",
      "phone",
      "address",
      "personalEmail",
    ],

    UPDATE: [
      "fullName",
      "gender",
      "dateOfBirth",
      "phone",
      "address",
      "personalEmail",
      "studentStatus",
    ],
  },

  REQUIRED: {
    CREATE: [
      "studentCode",
      "fullName",
      "dateOfBirth",
      "phone",
      "personalEmail",
    ],
  },
};

const STUDENT_MAPS = {
  SEARCH: {
    studentCode: "stu.student_code",
    fullName: "stu.full_name",
    phone: "stu.phone",
    personalEmail: "stu.personal_email",
  },

  SORT: {
    studentId: "stu.student_id",
    studentCode: "stu.student_code",
    fullName: "stu.full_name",
    createdAt: "stu.created_at",
  },

  FILTER: {
    gender: "stu.gender",
    studentStatus: "stu.student_status",
    accountId: "stu.account_id",
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
  ACCOUNT_FIELDS,
  STUDENT_FIELDS,
  ACCOUNT_MAPS,
  STUDENT_MAPS,
};
