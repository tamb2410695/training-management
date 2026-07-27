const { ROLES } = require("../auth/roles");

const ACCOUNT_FIELDS = {
  BODY: [
      "username",
      "password",
    ],

  REQUIRED:["username", "password"],
};

const PROFILE_FIELDS = {
  STUDENT: {
    BODY:  [
        "fullName",
        "gender",
        "dateOfBirth",
        "phone",
        "address",
        "personalEmail",
      ],
    REQUIRED: ["fullName", "phone", "personalEmail"],
  },
  STAFF: {
    BODY: [
        "fullName",
        "gender",
        "dateOfBirth",
        "identityCard",
        "phone",
        "personalEmail",
        "address",
        "academicRank",
        "hireDate",
        "contractType",
      ],
    REQUIRED: ["fullName", "phone", "personalEmail"],
  },
};

const USER_FIELDS = {
  BODY: {
    CREATE_PAYLOAD: ["accountData", "profileData"],

    ALLOWED_PROFILE_TYPES: [ROLES.INSTRUCTOR, ROLES.STUDENT],
  },

  REQUIRED: {
    CREATE_PAYLOAD: ["profileType", "accountData", "profileData"],
  },
};

module.exports = {
  USER_FIELDS,
  PROFILE_FIELDS,
  ACCOUNT_FIELDS,
};
