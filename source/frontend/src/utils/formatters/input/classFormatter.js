
const { hasField } = require("../../helpers");
const { formatNumericId } = require("./paramsFormatter");
const { formatDateOnly } = require("./primitives/dateFormatter");
const { formatEmail } = require("./primitives/emailFormatter");
const { normalizeEnum } = require("./primitives/enumFormatter");
const { formatUsername } = require("./primitives/usernameFormatter");

function formatClassData(courseData) {
  const data = {
    ...courseData,
  };

  if (hasField(data, "courseId")) {
    data.courseId = formatNumericId(data.courseId);
  }

  if (hasField(data, "instructorId")) {
    data.instructorId = formatNumericId(data.instructorId);
  }

  if (hasField(data, "maxStudents")) {
    data.maxStudents = Number(data.maxStudents);
  }

  if (hasField(data, "currentStudents")) {
    data.currentStudents = Number(data.currentStudents);
  }

  if (hasField(data, "classStatus")) {
    data.classStatus = normalizeEnum(data.classStatus);
  }

  return data;
}

function formatClassQuery(query) {
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

  if (hasField(data, "courseId")) {
    data.courseId = formatNumericId(data.courseId);
  }

  if (hasField(data, "instructorId")) {
    data.instructorId = formatNumericId(data.instructorId);
  }

  if (hasField(data, "maxStudents")) {
    data.maxStudents = Number(data.maxStudents);
  }

  if (hasField(data, "currentStudents")) {
    data.currentStudents = Number(data.currentStudents);
  }

  if (hasField(data, "classStatus")) {
    data.classStatus = normalizeEnum(data.classStatus);
  }

  return data;
}

module.exports = {
  formatClassData,
  formatClassQuery,
};
