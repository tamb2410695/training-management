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

const INSTRUCTOR_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },
  QUERY: {
    SEARCHABLE: ["instructorCode", "fullName", "phone", "specialization"],
    SORTABLE: [
      "instructorId",
      "instructorCode",
      "fullName",
      "dateOfBirth",
      "specialization",
      "hireDate",
      "instructorStatus",
      "createdAt",
      "updatedAt",
    ],
    FILTERS: ["gender", "instructorStatus", "specialization"],

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
    CREATE: [
      "fullName",
      "dateOfBirth",
      "gender",
      "specialization",
      "phone",
      "address",
      "hireDate",
    ],
    UPDATE: [
      "fullName",
      "dateOfBirth",
      "gender",
      "specialization",
      "phone",
      "address",
      "hireDate",
      "instructorStatus",
    ],
  },
  REQUIRED: {
    CREATE: ["fullName", "dateOfBirth", "specialization", "phone"],
    UPDATE: [
      "fullName",
      "dateOfBirth",
      "gender",
      "specialization",
      "phone",
      "instructorStatus",
    ],
  },
};

const INSTRUCTOR_CODE = {
  PREFIX: "INS",
  LENGTH: 6,
};

module.exports = {
  ACCOUNT_FIELDS,
  INSTRUCTOR_FIELDS,
  INSTRUCTOR_CODE,
};
