const { QUERY_COMMON_FIELDS } = require("../../constants");

const CLASS_FIELDS = {
  QUERY: {
    SEARCHABLE: ["classCode"],
    SORTABLE: [
      "classId",
      "classCode",
      "courseId",
      "instructorId",
      "startDate",
      "endDate",
      "maxStudents",
      "currentStudents",
      "classStatus",
      "createdAt",
      "updatedAt",
    ],
    FILTERS: ["courseId", "instructorId", "classStatus"],
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
      "courseId",
      "instructorId",
      "startDate",
      "endDate",
      "maxStudents",
      "classStatus",
    ],
    UPDATE: [
      "courseId",
      "instructorId",
      "startDate",
      "endDate",
      "maxStudents",
      "currentStudents",
      "classStatus",
    ],
  },
  REQUIRED: {
    CREATE: [
      "courseId", 
      "instructorId", 
      "maxStudents"
    ],
    UPDATE: [
      "courseId",
      "instructorId",
      "startDate",
      "endDate",
      "maxStudents",
      "classStatus",
    ],
  },
};

const CLASS_CODE = {
  PREFIX: "CLS",
  LENGTH: 6,
};

module.exports = {
  CLASS_FIELDS,
  CLASS_CODE,
};