const { QUERY_COMMON_FIELDS } = require("../../constants");

const ENROLLMENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },
  QUERY: {
    SEARCHABLE: ["enrollmentCode"],
    SORTABLE: [
      "enrollmentId",
      "enrollmentCode",
      "enrollmentDate",
      "enrollmentStatus",
      "createdAt",
    ],
    FILTERS: ["enrollmentStatus", "studentId", "classId"],

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
    CREATE: ["studentId", "classId"],
    UPDATE_STATUS: ["enrollmentStatus"],
  },
  REQUIRED: {
    CREATE: ["studentId", "classId"],
    UPDATE_STATUS: ["enrollmentStatus"],
  },
};

const ENROLLMENT_CODE = {
  PREFIX: "ERM",
  LENGTH: 6,
};

module.exports = {
  ENROLLMENT_FIELDS,
  ENROLLMENT_CODE,
};
