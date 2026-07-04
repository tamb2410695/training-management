const { QUERY_COMMON_FIELDS } = require("../../constants");
const ATTENDANCE_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: [
      "studentCode",
      "fullName",
    ],

    SORTABLE: [
      "attendanceId",
      "markedAt",
      "createdAt",
    ],

    FILTERS: [
      "scheduleId",
      "studentId",
      "attendanceStatus",
    ],

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
      "studentId",
      "scheduleId",
      "attendanceStatus",
      "markedByStaffId",
    ],

    UPDATE: [
      "attendanceStatus",
    ],
  },

  REQUIRED: {
    CREATE: [
      "studentId",
      "scheduleId",
      "markedByStaffId",
    ],
  },
};

const ATTENDANCE_MAPS = {
  SEARCH: {
    studentCode: "st.student_code",
    fullName: "st.full_name",
  },

  SORT: {
    attendanceId: "a.attendance_id",
    markedAt: "a.marked_at",
    createdAt: "a.created_at",
  },

  FILTER: {
    scheduleId: "a.schedule_id",
    studentId: "a.student_id",
    attendanceStatus: "a.attendance_status",
    markedByStaffId: "a.marked_by_staff_id",
  },
};
module.exports = {
  ATTENDANCE_FIELDS,
  ATTENDANCE_MAPS,
};
