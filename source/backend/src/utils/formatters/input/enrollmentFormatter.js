
const { hasField } = require("../../helpers");
const { formatNumericId } = require("./paramsFormatter");
const { formatDateOnly } = require("./primitives/dateFormatter");
const { formatEmail } = require("./primitives/emailFormatter");
const { normalizeEnum } = require("./primitives/enumFormatter");
const { formatUsername } = require("./primitives/usernameFormatter");

function formatEnrollmentData(courseData) {
  const data = {
    ...courseData,
  };

  if (hasField(data, "studentId")) {
    data.studentId = formatNumericId(data.studentId);
  }

  if (hasField(data, "classId")) {
    data.classId = formatNumericId(data.classId);
  }

  if (hasField(data, "enrollmentStatus")) {
    data.enrollmentStatus = normalizeEnum(data.enrollmentStatus);
  }

  return data;
}

function formatEnrollmentQuery(query) {
  const data = {
    ...query,
  };

  if (hasField(data, "search")) {
    data.search = formatKeyword(data.search);
  }

  if (hasField(data, "page")) {
    data.page = Number(data.page);
  }

  if (hasField(data, "limit")) {
    data.limit = Number(data.limit);
  }

  if (hasField(data, "enrollmentId")) {
    data.enrollmentId = formatNumericId(data.enrollmentId);
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
