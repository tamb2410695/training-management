const { QUERY_COMMON_FIELDS } = require("../../constants");

const ROLE_FIELDS = {
  PARAMS: {
    ID: ["roleId"],
  },
  QUERY: {
    SEARCHABLE: ["roleName", "roleDescription"],
    SORTABLE: ["roleId", "roleName"],
    FILTERS: ["roleName"],
    
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
    CREATE: ["roleName", "roleDescription"],
    UPDATE: ["roleName", "roleDescription"],
  },
  REQUIRED: {
    CREATE: ["roleName"],
    UPDATE: ["roleName"],
  },
};

module.exports = {
  ROLE_FIELDS,
};