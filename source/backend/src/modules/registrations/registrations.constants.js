const { QUERY_COMMON_FIELDS } = require("../../constants");

const REGISTRATION_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const REGISTRATION_ACTIONS = {
  APPROVE: "approve",
  REJECT: "reject",
};

const REGISTRATION_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: [
      "registrationCode",
      "fullName",
      "phone",
      "personalEmail",
    ],

    SORTABLE: [
      "registrationId",
      "registrationCode",
      "createdAt",
    ],

    FILTERS: [
      "registrationStatus",
      "studentId",
      "courseId",
    ],

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
    ],
  },

  REQUIRED: {
    CREATE: [
      "fullName",
      "gender",
      "dateOfBirth",
      "phone",
      "personalEmail",
      "courseId",
    ],
  },
};

const REGISTRATION_MAPS = {
  SEARCH: {
    registrationCode: "reg.registration_code",
    fullName: "reg.full_name",
    phone: "reg.phone",
    personalEmail: "reg.personal_email",
  },

  SORT: {
    registrationId: "reg.registration_id",
    registrationCode: "reg.registration_code",
    createdAt: "reg.created_at",
  },

  FILTER: {
    registrationStatus: "reg.registration_status",
    studentId: "reg.student_id",
    courseId: "reg.course_id",
  },
};

module.exports = {
  REGISTRATION_STATUS,
  REGISTRATION_ACTIONS,
  REGISTRATION_FIELDS,
  REGISTRATION_MAPS,
};