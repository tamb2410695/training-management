const {
  normalizeEnum,
  toDate,
  trimString,
  toUpper,
} = require("@/utils/formatters/input/primitives");

const { formatKeyword } = require("@/utils/formatters/input/queryFormatter");

const { hasField } = require("@/utils/helpers");

const { CLASS_FIELDS } = require("./classes.constants");

// ===============================
// Body Formatter
// ===============================

function formatClassData(classData) {
  const data = {
    ...classData,
  };

  if (hasField(data, "courseId")) {
    data.courseId = Number(data.courseId);
  }

  if (hasField(data, "teacherId")) {
    data.teacherId = Number(data.teacherId);
  }

  if (hasField(data, "classCode")) {
    data.classCode = toUpper(trimString(data.classCode));
  }

  if (hasField(data, "className")) {
    data.className = trimString(data.className);
  }

  if (hasField(data, "startDate")) {
    data.startDate = toDate(data.startDate);
  }

  if (hasField(data, "endDate")) {
    data.endDate = toDate(data.endDate);
  }

  if (hasField(data, "maxStudents")) {
    data.maxStudents = Number(data.maxStudents);
  }

  return data;
}

// ===============================
// Query Formatter
// ===============================

function formatClassQuery(query) {
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

    data.searchField = CLASS_FIELDS.QUERY.SEARCHABLE.includes(searchField)
      ? searchField
      : undefined;
  }

  if (hasField(data, "sortBy")) {
    const sortBy = trimString(data.sortBy);

    data.sortBy = CLASS_FIELDS.QUERY.SORTABLE.includes(sortBy)
      ? sortBy
      : undefined;
  }

  if (hasField(data, "sortOrder")) {
    data.sortOrder = toUpper(trimString(data.sortOrder));
  }

  if (hasField(data, "courseId")) {
    data.courseId = Number(data.courseId);
  }

  if (hasField(data, "teacherId")) {
    data.teacherId = Number(data.teacherId);
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
