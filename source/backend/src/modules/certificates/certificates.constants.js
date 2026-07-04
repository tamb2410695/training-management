const { QUERY_COMMON_FIELDS } = require("../../constants");

const CERTIFICATE_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["certificateCode"],

    SORTABLE: ["certificateId", "issueDate"],

    FILTERS: ["certificateStatus"],

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
    CREATE: ["enrollmentId"],

    UPDATE: ["certificateStatus"],
  },

  REQUIRED: {
    CREATE: ["enrollmentId"],
  },
};

const CERTIFICATE_MAPS = {
  SEARCH: {
    certificateCode: "c.certificate_code",
  },

  SORT: {
    certificateId: "c.certificate_id",
    issueDate: "c.issue_date",
  },

  FILTER: {
    certificateStatus: "c.certificate_status",
    enrollmentId: "c.enrollment_id",
  },
};

module.exports = {
  CERTIFICATE_FIELDS,
  CERTIFICATE_MAPS,
};
