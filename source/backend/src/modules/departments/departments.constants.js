const { QUERY_COMMON_FIELDS } = require("../../constants");

const DEPARTMENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["departmentCode", "departmentName"],

    SORTABLE: ["departmentId", "departmentCode", "departmentName"],

    FILTERS: [],

    get ALLOWED_KEYS() {
      return [
        ...new Set([
          ...QUERY_COMMON_FIELDS.ALL_KEYS,
          ...this.SEARCHABLE,
          ...this.SORTABLE,
        ]),
      ];
    },
  },

  BODY: {
    CREATE: ["departmentCode", "departmentName"],

    UPDATE: ["departmentCode", "departmentName"],
  },

  REQUIRED: {
    CREATE: ["departmentCode", "departmentName"],

    UPDATE: ["departmentCode", "departmentName"],
  },
};

const DEPARTMENT_MAPS = {
  SEARCH: {
    departmentCode: "dpt.department_code",
    departmentName: "dpt.department_name",
  },

  SORT: {
    departmentId: "dpt.department_id",
    departmentCode: "dpt.department_code",
    departmentName: "dpt.department_name",
  },

  FILTER: {
    departmentCode: "dpt.department_code",
    departmentName: "dpt.department_name",
  },
};

module.exports = {
  DEPARTMENT_FIELDS,
  DEPARTMENT_MAPS,
};
