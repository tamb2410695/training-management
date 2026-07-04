const { QUERY_COMMON_FIELDS } = require("../../../constants");
const STAFF_CAPABILITY_FIELDS = {
  PARAMS: {
    STAFF_ID: ["staffId"],
    COURSE_ID: ["courseId"],
  },

  QUERY: {
    SEARCHABLE: [
      "staffCode",
      "fullName",
      "courseCode",
      "courseName",
    ],

    SORTABLE: [
      "assignedAt",
      "updatedAt",
    ],

    FILTERS: [
      "staffId",
      "courseId",
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
      "staffId",
      "courseId",
    ],
  },

  REQUIRED: {
    CREATE: [
      "staffId",
      "courseId",
    ],
  },
};

const STAFF_CAPABILITY_MAPS = {
  SEARCH: {
    staffCode: "sp.staff_code",
    fullName: "sp.full_name",
    courseCode: "c.course_code",
    courseName: "c.course_name",
  },

  SORT: {
    assignedAt: "sc.assigned_at",
    updatedAt: "sc.updated_at",
  },

  FILTER: {
    staffId: "sc.staff_id",
    courseId: "sc.course_id",
  },
};
module.exports = {
  STAFF_CAPABILITY_FIELDS,
  STAFF_CAPABILITY_MAPS,
};
