const { QUERY_COMMON_FIELDS } = require("../../constants");

const CERTIFICATE_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },
  QUERY: {
    SEARCHABLE: ["certificateCode"],
    SORTABLE: ["certificateId", "certificateCode", "issueDate", "certificateStatus"],
    FILTERS: ["certificateStatus", "enrollmentId"],
    
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
    CREATE: ["enrollmentId"],
    UPDATE_STATUS: ["certificateStatus"],
  },
  REQUIRED: {
    CREATE: ["enrollmentId"],
    UPDATE_STATUS: ["certificateStatus"],
  },
};

const CERTIFICATE_CODE = {
  PREFIX: "CERT",
  LENGTH: 6,
};

module.exports = {
  CERTIFICATE_FIELDS,
  CERTIFICATE_CODE,
};