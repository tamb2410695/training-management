
const { hasField } = require("../../helpers");
const { formatDateOnly } = require("./primitives/dateFormatter");
const { formatEmail } = require("./primitives/emailFormatter");
const { normalizeEnum } = require("./primitives/enumFormatter");
const { formatUsername } = require("./primitives/usernameFormatter");

function formatInstructorData(studentData) {
  const data = {
    ...studentData,
  };

  if (hasField(data, "instructorStatus")) {
    data.instructorStatus = normalizeEnum(data.instructorStatus);
  }

  if (hasField(data, "gender")) {
    data.gender = normalizeEnum(data.gender);
  }

  if (hasField(data, "phone")) {
    data.phone = normalizeEnum(data.phone);
  }
  
  if (hasField(data, "dateOfBirth")) {
    data.dateOfBirth = formatDateOnly(data.dateOfBirth);
  }

  return data;
}

function formatInstructorQuery(query) {
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

  if (hasField(data, "instructorStatus")) {
    data.instructorStatus = normalizeEnum(data.instructorStatus);
  }

  if (hasField(data, "gender")) {
    data.gender = normalizeEnum(data.gender);
  }

  return data;
}

module.exports = {
  formatInstructorData,
  formatInstructorQuery,
};
