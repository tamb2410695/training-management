const { QUERY_COMMON_FIELDS } = require("../../constants");

const ACCOUNT_FIELDS = {
  QUERY: {
    SEARCHABLE: ["username", "email"],
    SORTABLE: ["accountId", "username", "email", "createdAt", "updatedAt"],
    FILTERS: ["accountStatus"],
    get ALLOWED_KEYS() {
      return [
        ...new Set([
          ...QUERY_COMMON_FIELDS.PAGINATION,
          ...this.SEARCHABLE,
          ...this.SORTABLE,
          ...this.FILTERS,
        ]),
      ];
    },
  },
  BODY: {
    CREATE: ["username", "email", "password", "avatarUrl"],
    UPDATE: ["username", "email", "avatarUrl", "accountStatus", "refreshToken"],
  },
  REQUIRED: {
    CREATE: ["username", "email", "password"],
    UPDATE: ["username", "email", "accountStatus"],
  },
};

const STUDENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },
  QUERY: {
    SEARCHABLE: ["studentCode", "fullName", "phone", "address"],
    SORTABLE: [
      "studentId",
      "studentCode",
      "fullName",
      "dateOfBirth",
      "studentStatus",
      "createdAt",
      "updatedAt",
    ],
    FILTERS: ["gender", "studentStatus"],

    get ALLOWED_KEYS() {
      return [
        ...new Set([
          ...QUERY_COMMON_FIELDS.PAGINATION,
          ...this.SEARCHABLE,
          ...this.SORTABLE,
          ...this.FILTERS,
        ]),
      ];
    },
  },
  BODY: {
    CREATE: ["fullName", "dateOfBirth", "gender", "phone", "address"],
    UPDATE: [
      "fullName",
      "dateOfBirth",
      "gender",
      "phone",
      "address",
      "studentStatus",
    ],
  },
  REQUIRED: {
    CREATE: ["fullName", "dateOfBirth", "phone"],
    UPDATE: ["fullName", "dateOfBirth", "gender", "phone", "studentStatus"],
  },
};

const STUDENT_CODE = {
  PREFIX: "STU",
  LENGTH: 6,
};

module.exports = {
  ACCOUNT_FIELDS,
  STUDENT_FIELDS,
  STUDENT_CODE,
};
