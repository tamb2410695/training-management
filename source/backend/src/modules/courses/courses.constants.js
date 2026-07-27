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
    courseCode: "crs.course_code",
    courseName: "crs.course_name",
  },

  SORT: {
    courseId: "crs.course_id",
    courseCode: "crs.course_code",
    courseName: "crs.course_name",
    tuitionFee: "crs.tuition_fee",
    createdAt: "crs.created_at",
  },

  FILTER: {
    courseLevel: "crs.course_level",
    courseStatus: "crs.course_status",
    certificateAvailable: "crs.certificate_available",
  },
};

module.exports = {
  COURSE_FIELDS,
  COURSE_MAPS,
};
