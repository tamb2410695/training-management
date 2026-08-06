const {
  normalizeEnum,
  toDate,
  formatEmail,
  trimString,
  toUpper,
} = require("@/utils/formatters/input/primitives");

const { formatKeyword } = require("@/utils/formatters/input/queryFormatter");
const { hasField } = require("@/utils/helpers");
const { STUDENT_PROFILE_FIELDS } = require("./students.constants");

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

  if (hasField(data, "accountEmail")) {
    data.accountEmail = formatEmail(data.accountEmail);
  }

  if (hasField(data, "personalEmail")) {
    data.personalEmail = formatEmail(data.personalEmail);
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

  if (hasField(data, "search")) {
    data.search = formatKeyword(data.search);
  }

  if (hasField(data, "searchField")) {
    const searchField = trimString(data.searchField);

    data.searchField = STUDENT_PROFILE_FIELDS.QUERY.SEARCHABLE.includes(
      searchField,
    )
      ? searchField
      : undefined;
  }

  if (hasField(data, "sortBy")) {
    const sortBy = trimString(data.sortBy);

    data.sortBy = STUDENT_PROFILE_FIELDS.QUERY.SORTABLE.includes(sortBy)
      ? sortBy
      : undefined;
  }

  if (hasField(data, "sortOrder")) {
    data.sortOrder = toUpper(trimString(data.sortOrder));
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