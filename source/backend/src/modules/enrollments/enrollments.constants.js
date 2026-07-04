const { QUERY_COMMON_FIELDS } = require("../../constants");

const ENROLLMENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["enrollmentCode", "studentCode", "fullName", "classCode"],

    SORTABLE: ["enrollmentId", "enrollmentCode", "enrollmentDate", "createdAt"],

    FILTERS: ["studentId", "classId", "enrollmentStatus"],

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
    CREATE: ["studentId", "classId"],

    UPDATE: ["enrollmentStatus"],
  },

  REQUIRED: {
    CREATE: ["studentId", "classId"],
  },
};

const ENROLLMENT_MAPS = {
  SEARCH: {
    enrollmentCode: "e.enrollment_code",
    studentCode: "s.student_code",
    fullName: "s.full_name",
    classCode: "c.class_code",
  },

  SORT: {
    enrollmentId: "e.enrollment_id",
    enrollmentDate: "e.enrollment_date",
  },

  FILTER: {
    studentId: "e.student_id",
    classId: "e.class_id",
    enrollmentStatus: "e.enrollment_status",
    updatedAt: "e.updated_at",
    createdAt: "e.created_at",
  },
};

module.exports = {
  ENROLLMENT_FIELDS,
  ENROLLMENT_MAPS,
};
