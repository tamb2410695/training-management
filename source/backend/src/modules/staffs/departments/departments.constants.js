const { QUERY_COMMON_FIELDS } = require("../../../constants");

const STAFF_DEPARTMENT_FIELDS = {
  PARAMS: {
    STAFF_ID: ["staffId"],
    DEPARTMENT_ID: ["departmentId"],
  },

  QUERY: {
    SEARCHABLE: [],

    SORTABLE: [
      "assignedAt",
      "updatedAt",
    ],

    FILTERS: [
      "staffId",
      "departmentId",
      "appointmentType",
    ],

    get ALLOWED_KEYS() {
      return [
        ...new Set([
          ...QUERY_COMMON_FIELDS.ALL_KEYS,
          ...this.SORTABLE,
          ...this.FILTERS,
        ]),
      ];
    },
  },

  BODY: {
    CREATE: [
      "staffId",
      "departmentId",
      "appointmentType",
      "assignedAt",
    ],
  },

  REQUIRED: {
    CREATE: [
      "staffId",
      "departmentId",
      "assignedAt",
    ],
  },
};

const STAFF_DEPARTMENT_MAPS = {
  SEARCH: {},

  SORT: {
    assignedAt: "sd.assigned_at",
    updatedAt: "sd.updated_at",
  },

  FILTER: {
    staffId: "sd.staff_id",
    departmentId: "sd.department_id",
    appointmentType: "sd.appointment_type",
  },
};

module.exports = {
  STAFF_DEPARTMENT_FIELDS,
  STAFF_DEPARTMENT_MAPS,
};
