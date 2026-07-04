// const { QUERY_COMMON_FIELDS } = require("../../constants");

// const ROLE_FIELDS = {
//   PARAMS: {
//     ID: ["id"],
//   },

//   QUERY: {
//     SEARCHABLE: ["roleCode", "roleName"],
//     SORTABLE: ["roleId", "roleCode", "roleName"],
//     FILTERS: [],
//     get ALLOWED_KEYS() {
//       return [
//         ...new Set([
//           ...QUERY_COMMON_FIELDS.ALL_KEYS,
//           ...this.SEARCHABLE,
//           ...this.SORTABLE,
//           ...this.FILTERS,
//         ]),
//       ];
//     },
//   },

//   BODY: {
//     CREATE: ["roleCode", "roleName", "roleDescription"],

//     UPDATE: ["roleCode", "roleName", "roleDescription"],
//   },

//   REQUIRED: {
//     CREATE: ["roleCode", "roleName"],
//     UPDATE: ["roleCode", "roleName"],
//   },
// };

// const ROLE_MAPS = {
//   SEARCH: {
//     roleCode: "rl.role_code",
//     roleName: "rl.role_name",
//   },
//   SORT: {
//     roleId: "rl.role_id",
//     roleCode: "rl.role_code",
//     roleName: "rl.role_name",
//   },
// };

// module.exports = {
//   ROLE_FIELDS,
//   ROLE_MAPS,
// };


const ROLE_FIELDS = {
  DB_COLUMNS: ["role_id", "role_code", "role_name", "role_description"],
  
  INTERNAL_ASSIGN: ["accountId", "roleCode"],
};

const ROLE_MAPS = {
  DB_TO_DTO: {
    role_id: "rl.roleId",
    role_code: "rl.roleCode",
    role_name: "rl.roleName",
    role_description: "rl.roleDescription",
    assigned_at: "ur.assignedAt"
  }
};

const SYSTEM_ROLES = {
  ADMIN: "ADMIN",
  INSTRUCTOR: "INSTRUCTOR",
  STUDENT: "STUDENT",
};

const VALID_ROLE_CODES = Object.values(SYSTEM_ROLES);

module.exports = {
  ROLE_FIELDS,
  ROLE_MAPS,
  SYSTEM_ROLES,
  VALID_ROLE_CODES
};