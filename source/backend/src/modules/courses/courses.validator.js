const { COURSE_STATUS } = require("@/constants");

const { COURSE_FIELDS } = require("./courses.constants");

const {
  validateId,
  validateEnum,
  validateNumber,
  queryValidator,
  hasField,
} = require("@/utils");

const validateCourseFormats = (data) => {
  if (!data) return;

  // Query validation
  queryValidator(
    data,
    COURSE_FIELDS.QUERY.SEARCHABLE,
    COURSE_FIELDS.QUERY.SORTABLE,
  );

  // IDs

  if (hasField(data, "categoryId")) {
    validateId(data.categoryId, "categoryId");
  }

  // Enum

  if (hasField(data, "courseStatus")) {
    validateEnum(
      data.courseStatus,
      Object.values(COURSE_STATUS),
      "courseStatus",
    );
  }

  // Number

  if (hasField(data, "durationHours")) {
    validateNumber(data.durationHours, "durationHours");
  }
};

module.exports = {
  validateCourseFormats,
};
