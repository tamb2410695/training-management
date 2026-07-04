const { QUERY_COMMON_FIELDS } = require("../../constants");const GRADE_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: [
      "studentCode",
      "fullName",
      "classCode",
    ],

    SORTABLE: [
      "gradeId",
      "averageScore",
      "finalScore",
    ],

    FILTERS: [
      "gradeStatus",
      "result",
      "classId",
    ],

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
      "studentId",
      "classId",
      "assignmentScore",
      "midtermScore",
      "finalScore",
    ],

    UPDATE: [
      "assignmentScore",
      "midtermScore",
      "finalScore",
      "gradeStatus",
    ],
  },

  REQUIRED: {
    CREATE: [
      "studentId",
      "classId",
    ],
  },
};

const GRADE_MAPS = {
  SEARCH: {
    studentCode: "s.student_code",
    fullName: "s.full_name",
    classCode: "c.class_code",
  },

  SORT: {
    gradeId: "g.grade_id",
    averageScore: "g.average_score",
    finalScore: "g.final_score",
  },

  FILTER: {
    classId: "g.class_id",
    studentId: "g.student_id",
    gradeStatus: "g.grade_status",
    result: "g.result",
  },
};
module.exports = {
  GRADE_FIELDS,
  GRADE_MAPS,
};
