const { QUERY_COMMON_FIELDS } = require("../../constants");
const SCHEDULE_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["classCode", "staffName", "roomName"],

    SORTABLE: ["scheduleId", "sessionNumber", "sessionDate", "startTime"],

    FILTERS: ["classId", "staffId", "roomId", "scheduleStatus"],

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
      "roomId",
      "staffId",
      "classId",
      "sessionNumber",
      "sessionDate",
      "startTime",
      "endTime",
    ],

    UPDATE: [
      "roomId",
      "staffId",
      "sessionDate",
      "startTime",
      "endTime",
      "scheduleStatus",
    ],
  },

  REQUIRED: {
    CREATE: [
      "roomId",
      "staffId",
      "classId",
      "sessionDate",
      "startTime",
      "endTime",
    ],
  },
};

const SCHEDULE_MAPS = {
  SEARCH: {
    classCode: "c.class_code",
    staffName: "sp.full_name",
    roomName: "r.room_name",
  },

  SORT: {
    scheduleId: "s.schedule_id",
    sessionNumber: "s.session_number",
    sessionDate: "s.session_date",
    startTime: "s.start_time",
  },

  FILTER: {
    classId: "s.class_id",
    staffId: "s.staff_id",
    roomId: "s.room_id",
    scheduleStatus: "s.schedule_status",
    sessionDate: "s.session_date",
  },
};
module.exports = {
  SCHEDULE_FIELDS,
  SCHEDULE_MAPS,
};
