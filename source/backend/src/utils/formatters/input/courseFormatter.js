
const { hasField } = require("../../helpers");
const { formatDateOnly } = require("./primitives/dateFormatter");
const { formatEmail } = require("./primitives/emailFormatter");
const { normalizeEnum } = require("./primitives/enumFormatter");
const { formatUsername } = require("./primitives/usernameFormatter");

function formatCourseData(courseData) {
  const data = {
    ...courseData,
  };

  if (hasField(data, "courseLevel")) {
    data.courseLevel = normalizeEnum(data.courseLevel);
  }
  if (hasField(data, "courseStatus")) {
    data.courseStatus = normalizeEnum(data.courseStatus);
  }

  if (hasField(data, "certificateAvailable")) {
    data.certificateAvailable = normalizeEnum(data.certificateAvailable);
  }

  return data;
}

function formatCourseQuery(query) {
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

  if (hasField(data, "courseStatus")) {
    data.courseStatus = normalizeEnum(data.courseStatus);
  }

  if (hasField(data, "certificateAvailable")) {
    data.certificateAvailable = normalizeEnum(data.certificateAvailable);
  }

  return data;
}

module.exports = {
  formatCourseData,
  formatCourseQuery,
};
