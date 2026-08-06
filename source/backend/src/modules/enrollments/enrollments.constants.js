const { QUERY_COMMON_FIELDS } = require("../../constants");

const ENROLLMENT_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const ENROLLMENT_ACTIONS = {
  APPROVE: "approve",
  REJECT: "reject",
};

const ENROLLMENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: [
      "studentCode",
      "studentName",
      "classCode",
      "className",
    ],

    SORTABLE: [
      "enrollmentId",
      "enrollmentDate",
      "createdAt",
      "studentName",
      "className",
    ],

    FILTERS: [
      "studentId",
      "classId",
      "enrollmentStatus",
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
    ],

    UPDATE: [],
  },

  REQUIRED: {
    CREATE: [
      "studentId",
      "classId",
    ],
  },
};

const ENROLLMENT_MAPS = {
  SEARCH: {
    studentCode: "stu.student_code",
    studentName: "stu.full_name",
    classCode: "cls.class_code",
    className: "cls.class_name",
  },

  SORT: {
    enrollmentId: "enr.enrollment_id",
    enrollmentDate: "enr.enrollment_date",
    createdAt: "enr.created_at",
    studentName: "stu.full_name",
    className: "cls.class_name",
  },

  FILTER: {
    studentId: "enr.student_id",
    classId: "enr.class_id",
    enrollmentStatus: "enr.enrollment_status",
  },
};

module.exports = {
  ENROLLMENT_STATUS,
  ENROLLMENT_ACTIONS,
  ENROLLMENT_FIELDS,
  ENROLLMENT_MAPS,
};