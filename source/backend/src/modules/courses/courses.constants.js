const { QUERY_COMMON_FIELDS } = require("../../constants");

const COURSE_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["courseCode", "courseName"],

    SORTABLE: [
      "courseId",
      "courseCode",
      "courseName",
      "tuitionFee",
      "createdAt",
    ],

    FILTERS: ["courseLevel", "courseStatus", "certificateAvailable"],

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
      "courseName",
      "courseCode",
      "courseDescription",
      "durationHours",
      "totalSessions",
      "tuitionFee",
      "courseLevel",
      "certificateAvailable",
      "coverImage",
    ],

    UPDATE: [
      "courseName",
      "courseDescription",
      "durationHours",
      "totalSessions",
      "tuitionFee",
      "courseLevel",
      "certificateAvailable",
      "courseStatus",
      "coverImage",
    ],
  },

  REQUIRED: {
    CREATE: ["courseName", "durationHours", "totalSessions"],
  },
};

const COURSE_MAPS = {
  SEARCH: {
    courseCode: "c.course_code",
    courseName: "c.course_name",
  },

  SORT: {
    courseId: "c.course_id",
    courseCode: "c.course_code",
    courseName: "c.course_name",
    tuitionFee: "c.tuition_fee",
    createdAt: "c.created_at",
  },

  FILTER: {
    courseLevel: "c.course_level",
    courseStatus: "c.course_status",
    certificateAvailable: "c.certificate_available",
  },
};

module.exports = {
  COURSE_FIELDS,
  COURSE_MAPS,
};
