const { QUERY_COMMON_FIELDS } = require("@/constants");

const COURSE_STATUS = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
};

const COURSE_ACTIONS = {
  PUBLISH: "publish",
  ARCHIVE: "archive",
};

const COURSE_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: [
      "courseCode",
      "courseName",
      "description",
      "categoryName",
      "categoryCode",
    ],

    SORTABLE: [
      "courseId",
      "courseCode",
      "courseName",
      "durationHours",
      "courseStatus",
      "createdAt",
      "updatedAt",
      "categoryName",
      "categoryCode",
    ],

    FILTERS: [
      "categoryId",
      "courseStatus",
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
      "categoryId",
      "courseCode",
      "courseName",
      "description",
      "durationHours",
    ],

    UPDATE: [
      "categoryId",
      "courseCode",
      "courseName",
      "description",
      "durationHours",
    ],
  },

  REQUIRED: {
    CREATE: [
      "categoryId",
      "courseName",
      "durationHours",
    ],
  },
};

const COURSE_MAPS = {
  SEARCH: {
    courseCode: "crs.course_code",
    courseName: "crs.course_name",
    description: "crs.description",
    categoryName: "cc.category_name",
    categoryCode: "cc.category_code",
  },

  SORT: {
    courseId: "crs.course_id",
    courseCode: "crs.course_code",
    courseName: "crs.course_name",
    durationHours: "crs.duration_hours",
    courseStatus: "crs.course_status",
    createdAt: "crs.created_at",
    updatedAt: "crs.updated_at",
    categoryName: "cc.category_name",
    categoryCode: "cc.category_code",
  },

  FILTER: {
    categoryId: "crs.category_id",
    courseStatus: "crs.course_status",
  },
};

module.exports = {
  COURSE_STATUS,
  COURSE_ACTIONS,
  COURSE_FIELDS,
  COURSE_MAPS,
};