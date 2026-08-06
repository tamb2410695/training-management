const {
  normalizeEnum,
  trimString,
  toUpper,
} = require("@/utils/formatters/input/primitives");

const { formatKeyword } = require("@/utils/formatters/input/queryFormatter");

const { hasField } = require("@/utils/helpers");

const { COURSE_FIELDS } = require("./courses.constants");

function formatCourseData(courseData) {
  const data = {
    ...courseData,
  };

  if (hasField(data, "courseCode")) {
    data.courseCode = toUpper(trimString(data.courseCode));
  }

  if (hasField(data, "courseName")) {
    data.courseName = trimString(data.courseName);
  }

  if (hasField(data, "description")) {
    data.description = trimString(data.description);
  }

  if (hasField(data, "categoryId")) {
    data.categoryId = Number(data.categoryId);
  }

  if (hasField(data, "durationHours")) {
    data.durationHours = Number(data.durationHours);
  }

  return data;
}

function formatCourseQuery(query) {
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

    data.searchField = COURSE_FIELDS.QUERY.SEARCHABLE.includes(searchField)
      ? searchField
      : undefined;
  }

  if (hasField(data, "sortBy")) {
    const sortBy = trimString(data.sortBy);

    data.sortBy = COURSE_FIELDS.QUERY.SORTABLE.includes(sortBy)
      ? sortBy
      : undefined;
  }

  if (hasField(data, "sortOrder")) {
    data.sortOrder = toUpper(trimString(data.sortOrder));
  }

  if (hasField(data, "categoryId")) {
    data.categoryId = Number(data.categoryId);
  }

  if (hasField(data, "courseStatus")) {
    data.courseStatus = normalizeEnum(data.courseStatus);
  }

  return data;
}

module.exports = {
  formatCourseData,

  formatCourseQuery,
};
