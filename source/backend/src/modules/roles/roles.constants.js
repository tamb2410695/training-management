const ROLE_FIELDS = {
  DB_COLUMNS: [
    "role_id",
    "role_code",
    "role_label",
    "role_description",
  ],

  CREATE: [
    "roleCode",
    "roleLabel",
    "roleDescription",
  ],

  UPDATE: [
    "roleLabel",
    "roleDescription",
  ],
};


const ROLE_MAPS = {
  DB_TO_DTO: {
    role_id: "roleId",
    role_code: "roleCode",
    role_label: "roleLabel",
    role_description: "roleDescription",
  },

  DTO_TO_DB: {
    roleCode: "role_code",
    roleLabel: "role_label",
    roleDescription: "role_description",
  },
};


const SYSTEM_ROLES = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  STUDENT: "STUDENT",
};


const VALID_ROLE_CODES = Object.values(SYSTEM_ROLES);


module.exports = {
  ROLE_FIELDS,
  ROLE_MAPS,
  SYSTEM_ROLES,
  VALID_ROLE_CODES,
};