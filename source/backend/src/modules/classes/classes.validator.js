const { CLASS_STATUS } = require("@/constants");

const { CLASS_FIELDS } = require("./classes.constants");

const {
  validateId,

  validateEnum,

  validateNumber,

  queryValidator,

  hasField,
  validateDate,
} = require("@/utils");

// ===============================
// Format Validation
// ===============================

const validateClassFormats = (data) => {
  if (!data) return;

  queryValidator(
    data,

    CLASS_FIELDS.QUERY.SEARCHABLE,

    CLASS_FIELDS.QUERY.SORTABLE,
  );

  if (hasField(data, "classId")) {
    validateId(
      data.classId,

      "classId",
    );
  }

  if (hasField(data, "courseId")) {
    validateId(
      data.courseId,

      "courseId",
    );
  }

  if (hasField(data, "teacherId")) {
    validateId(
      data.teacherId,

      "teacherId",
    );
  }

  if (hasField(data, "className")) {
    validateString(data.className, "className", {
      minLength: 3,
      maxLength: 100,
    });
  }

  if (hasField(data, "classCode")) {
    validateString(data.classCode, "classCode", {
      maxLength: 30,
    });
  }

  if (hasField(data, "maxStudents")) {
    validateNumber(data.maxStudents, "maxStudents");

    if (Number(data.maxStudents) < 0) {
      throw new ValidationError(
        ERROR_CODES.VALIDATION_FAILED,
        "maxStudents must be at least 0",
      );
    }
  }

  if (hasField(data, "classStatus")) {
    validateEnum(
      data.classStatus,

      Object.values(CLASS_STATUS),

      "classStatus",
    );
  }

  if (hasField(data, "startDate")) {
    validateDate(data.startDate, "startDate");
  }

  if (hasField(data, "endDate")) {
    validateDate(data.endDate, "endDate");
  }

  if (hasField(data, "startDate") && hasField(data, "endDate")) {
    if (new Date(data.endDate) < new Date(data.startDate)) {
      throw new ValidationError(
        ERROR_CODES.VALIDATION_FAILED,
        "endDate must be greater than or equal to startDate",
      );
    }
  }
};

module.exports = {
  validateClassFormats,
};
