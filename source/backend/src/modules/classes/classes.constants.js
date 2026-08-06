const { QUERY_COMMON_FIELDS } = require("@/constants");

const CLASS_STATUS = {
  DRAFT: "DRAFT",
  OPEN: "OPEN",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

const CLASS_ACTIONS = {
  OPEN: "open",
  START: "start",
  COMPLETE: "complete",
  CANCEL: "cancel",
  ASSIGN_INSTRUCTOR: "assignInstructor",
};

const CLASS_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["classCode", "className", "courseName", "teacherName"],

    SORTABLE: [
      "classId",
      "classCode",
      "className",
      "startDate",
      "endDate",
      "maxStudents",
      "classStatus",
      "createdAt",
      "updatedAt",
      "courseName",
      "teacherName",
    ],

    FILTERS: ["courseId", "teacherId", "classStatus"],

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
      "courseId",
      "teacherId",
      "classCode",
      "className",
      "startDate",
      "endDate",
      "maxStudents",
    ],

    UPDATE: [
      "courseId",
      "teacherId",
      "classCode",
      "className",
      "startDate",
      "endDate",
      "maxStudents",
    ],
  },

  REQUIRED: {
    CREATE: ["courseId", "teacherId", "className", "startDate", "endDate"],
  },
};

const CLASS_MAPS = {
  SEARCH: {
    classCode: "cls.class_code",
    className: "cls.class_name",
    courseName: "crs.course_name",
    teacherName: "sp.full_name",
  },

  SORT: {
    classId: "cls.class_id",
    classCode: "cls.class_code",
    className: "cls.class_name",
    startDate: "cls.start_date",
    endDate: "cls.end_date",
    maxStudents: "cls.max_students",
    classStatus: "cls.class_status",
    createdAt: "cls.created_at",
    updatedAt: "cls.updated_at",
    courseName: "crs.course_name",
    teacherName: "sp.full_name",
  },

  FILTER: {
    courseId: "cls.course_id",
    teacherId: "cls.teacher_id",
    classStatus: "cls.class_status",
  },
};

module.exports = {
  CLASS_STATUS,
  CLASS_ACTIONS,
  CLASS_FIELDS,
  CLASS_MAPS,
};
