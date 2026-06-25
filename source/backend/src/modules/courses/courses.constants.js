const { QUERY_COMMON_FIELDS } = require("../../constants");

const COURSE_FIELDS = {
  QUERY: {
    SEARCHABLE: ["courseCode", "courseName", "courseDescription"],
    SORTABLE: [
      "courseId",
      "courseCode",
      "courseName",
      "durationHours",
      "totalSessions",
      "tuitionFee",
      "level",
      "createdAt",
      "updatedAt",
    ],
    FILTERS: ["courseStatus", "certificateAvailable", "level"],
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
      "courseName",
      "coverImage",
      "courseDescription",
      "durationHours",
      "totalSessions",
      "tuitionFee",
      "level",
      "certificateAvailable",
      "courseStatus",
    ],
    UPDATE: [
      "courseName",
      "coverImage",
      "courseDescription",
      "durationHours",
      "totalSessions",
      "tuitionFee",
      "level",
      "certificateAvailable",
      "courseStatus",
    ],
  },
  REQUIRED: {
    CREATE: [
      "courseName",
      "durationHours",
      "totalSessions"
    ],
    UPDATE: [
      "courseName",
      "durationHours",
      "totalSessions",
      "level",
      "certificateAvailable",
      "courseStatus",
    ],
  },
};

const COURSE_CODE = {
  PREFIX: "CRS",
  LENGTH: 6,
};

module.exports = {
  COURSE_FIELDS,
  COURSE_CODE
};