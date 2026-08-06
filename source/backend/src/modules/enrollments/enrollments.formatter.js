const {
  normalizeEnum,
  trimString,
  toUpper,
} = require("@/utils/formatters/input/primitives");

const { formatKeyword } = require("@/utils/formatters/input/queryFormatter");

const { hasField } = require("@/utils/helpers");

const { ENROLLMENT_FIELDS } = require("./enrollments.constants");

// ===============================
// Body Formatter
// ===============================

function formatEnrollmentData(enrollmentData) {
  const data = {
    ...enrollmentData,
  };

  if (hasField(data, "studentId")) {
    data.studentId = Number(data.studentId);
  }

  if (hasField(data, "classId")) {
    data.classId = Number(data.classId);
  }

  if (hasField(data, "enrollmentStatus")) {
    data.enrollmentStatus = normalizeEnum(data.enrollmentStatus);
  }

  return data;
}

// ===============================
// Query Formatter
// ===============================

function formatEnrollmentQuery(query) {
  const data = {
    ...query,
  };

  if (hasField(data, "page")) {
    data.page = Number(data.page);
  }

  if (hasField(data, "limit")) {
    data.limit = Number(data.limit);
  }

  if (hasField(data, "search")) {
    data.search = formatKeyword(data.search);
  }

  if (hasField(data, "searchField")) {
    const searchField = trimString(data.searchField);

    data.searchField = ENROLLMENT_FIELDS.QUERY.SEARCHABLE.includes(searchField)
      ? searchField
      : undefined;
  }

  if (hasField(data, "sortBy")) {
    const sortBy = trimString(data.sortBy);

    data.sortBy = ENROLLMENT_FIELDS.QUERY.SORTABLE.includes(sortBy)
      ? sortBy
      : undefined;
  }

  if (hasField(data, "sortOrder")) {
    data.sortOrder = toUpper(trimString(data.sortOrder));
  }

  if (hasField(data, "studentId")) {
    data.studentId = Number(data.studentId);
  }

  if (hasField(data, "classId")) {
    data.classId = Number(data.classId);
  }

  if (hasField(data, "enrollmentStatus")) {
    data.enrollmentStatus = normalizeEnum(data.enrollmentStatus);
  }

  return data;
}

module.exports = {
  formatEnrollmentData,
  formatEnrollmentQuery,
};
