const { QUERY_COMMON_FIELDS } = require("../../constants");

const ACCOUNT_FIELDS = {
  BODY: {
    ACTIVE: [
      "username",
      "email",
      "password",
      "avatarUrl",
    ],
  },

  REQUIRED: {
    ACTIVE: ["password"],
  },
};


const REGISTRATION_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["registrationCode", "fullName", "phone", "personalEmail"],

    SORTABLE: ["registrationId", "registrationCode", "createdAt"],

    FILTERS: ["registrationStatus"],

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
      "fullName",
      "gender",
      "dateOfBirth",
      "phone",
      "personalEmail",
      "address",
      "courseId",
    ],

    UPDATE: [
      "fullName",
      "gender",
      "dateOfBirth",
      "phone",
      "personalEmail",
      "address",
      "courseId",
      "studentId",
      "registrationStatus",
    ],
    ACTIVE: [
      "fullName",
      "gender",
      "dateOfBirth",
      "phone",
      "personalEmail",
      "address",
      "courseId",
    ]
  },

  REQUIRED: {
    CREATE: ["fullName", "phone", "personalEmail"],
  },
};

const REGISTRATION_MAPS = {
  SEARCH: {
    registrationCode: "reg.registration_code",
    fullName: "reg.full_name",
    phone: "reg.phone",
    personalEmail: "reg.personal_email",
    courseId: "reg.course_id",
  },

  SORT: {
    registrationId: "reg.registration_id",
    createdAt: "reg.created_at",
  },

  FILTER: {
    registrationStatus: "reg.registration_status",
    studentId: "reg.student_id",
  },
};

module.exports = {
  REGISTRATION_FIELDS,
  REGISTRATION_MAPS,
  ACCOUNT_FIELDS
};
