const { ENROLLMENT_STATUS } = require("@/constants");

const { ENROLLMENT_FIELDS } = require("./enrollments.constants");

const {
  validateId,
  validateEnum,
  queryValidator,
  hasField,
} = require("@/utils");

const validateEnrollmentFormats = (data) => {
  if (!data) return;

  queryValidator(
    data,

    ENROLLMENT_FIELDS.QUERY.SEARCHABLE,

    ENROLLMENT_FIELDS.QUERY.SORTABLE,
  );

  if (hasField(data, "studentId")) {
    validateId(
      data.studentId,

      "studentId",
    );
  }

  if (hasField(data, "classId")) {
    validateId(
      data.classId,

      "classId",
    );
  }

  if (hasField(data, "enrollmentStatus")) {
    validateEnum(
      data.enrollmentStatus,

      Object.values(ENROLLMENT_STATUS),

      "enrollmentStatus",
    );
  }
};

module.exports = {
  validateEnrollmentFormats,
};
