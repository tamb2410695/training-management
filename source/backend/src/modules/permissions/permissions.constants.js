const { QUERY_COMMON_FIELDS } = require("../../constants");

const PERMISSION_FIELDS = {
  PARAMS: {
    ID: ["permissionId"],
  },
  QUERY: {
    SEARCHABLE: ["permissionName", "permissionCode", "description"],
    SORTABLE: ["permissionId", "permissionName", "permissionCode", "createdAt"],
    FILTERS: ["permissionCode"],
    
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
    CREATE: ["permissionName", "permissionCode", "description"],
    UPDATE: ["permissionName", "permissionCode", "description"],
  },
  REQUIRED: {
    CREATE: ["permissionName", "permissionCode"],
    UPDATE: [],
  },
};

module.exports = {
  PERMISSION_FIELDS,
};