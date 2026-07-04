const { QUERY_COMMON_FIELDS } = require("../../constants");
const CLASS_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["classCode", "courseName"],

    SORTABLE: [
      "classId",
      "classCode",
      "startDate",
      "endDate",
      "maxStudents",
      "createdAt",
    ],

    FILTERS: ["courseId", "classStatus"],

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
    CREATE: ["classCode", "courseId", "startDate", "endDate", "maxStudents"],

    UPDATE: ["startDate", "endDate", "maxStudents", "classStatus"],
  },

  REQUIRED: {
    CREATE: ["courseId", "startDate", "endDate", "maxStudents"],
  },
};
const CLASS_MAPS = {
  SEARCH: {
    classCode: "cl.class_code",
    courseName: "c.course_name",
  },

  SORT: {
    classId: "cl.class_id",
    classCode: "cl.class_code",
    startDate: "cl.start_date",
    endDate: "cl.end_date",
  },

  FILTER: {
    courseId: "cl.course_id",
    classStatus: "cl.class_status",
    startDate: "cl.start_date",
    endDate: "cl.end_date",
  },
};

module.exports = {
  CLASS_FIELDS,
  CLASS_MAPS,
};
