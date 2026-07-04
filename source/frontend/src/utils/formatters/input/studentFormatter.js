
const { hasField } = require("../../helpers");
const { formatDateOnly } = require("./primitives/dateFormatter");
const { formatEmail } = require("./primitives/emailFormatter");
const { normalizeEnum } = require("./primitives/enumFormatter");
const { formatUsername } = require("./primitives/usernameFormatter");

function formatStudentData(studentData) {
  const data = {
    ...studentData,
  };

  if (hasField(data, "studentStatus")) {
    data.studentStatus = normalizeEnum(data.studentStatus);
  }

  if (hasField(data, "gender")) {
    data.gender = normalizeEnum(data.gender);
  }
  
  if (hasField(data, "dateOfBirth")) {
    data.dateOfBirth = formatDateOnly(data.dateOfBirth);
  }

  return data;
}

function formatStudentQuery(query) {
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

  if (hasField(data, "studentStatus")) {
    data.studentStatus = normalizeEnum(data.studentStatus);
  }

  if (hasField(data, "gender")) {
    data.gender = normalizeEnum(data.gender);
  }

  return data;
}

module.exports = {
  formatStudentData,
  formatStudentQuery,
};
