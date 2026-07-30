
const { hasField } = require("../../helpers");
const { toDate } = require("./primitives/dateFormatter");
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
    data.dateOfBirth = toDate(data.dateOfBirth);
  }

  if(hasField(data, "accountEmail")) {
    data.accountEmail = formatEmail(data.accountEmail)
  }

  if(hasField(data, "personalEmail")) {
    data.personalEmail = formatEmail(data.personalEmail)
  }

  return data;
}

function formatStudentQuery(query) {
  const data = {
    ...query,
  };
  if (hasField(data, "page")) {
    data.page = Number(data.page);
  }

  if (hasField(data, "limit")) {
    data.limit = Number(data.limit);
  }

  if (hasField(data, "studentStatus")) {
    data.studentStatus = normalizeEnum(data.studentStatus);
  }

  if (hasField(data, "accountStatus")) {
    data.accountStatus = normalizeEnum(data.accountStatus);
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
