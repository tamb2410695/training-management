const { trimString, toUpper } = require("@/utils/formatters/input/primitives");
const { formatKeyword } = require("@/utils/formatters/input/queryFormatter");
const { hasField } = require("@/utils/helpers");
const { COURSE_CATEGORY_FIELDS } = require("./courseCategories.constants");

function formatCourseCategoryData(categoryData) {
  const data = {
    ...categoryData,
  };

  if (hasField(data, "categoryCode")) {
    data.categoryCode = trimString(data.categoryCode);
  }

  if (hasField(data, "categoryName")) {
    data.categoryName = trimString(data.categoryName);
  }

  if (hasField(data, "description")) {
    data.description = trimString(data.description);
  }

  return data;
}

function formatCourseCategoryQuery(query) {
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

    data.searchField = COURSE_CATEGORY_FIELDS.QUERY.SEARCHABLE.includes(
      searchField,
    )
      ? searchField
      : undefined;
  }

  if (hasField(data, "sortBy")) {
    const sortBy = trimString(data.sortBy);

    data.sortBy = COURSE_CATEGORY_FIELDS.QUERY.SORTABLE.includes(sortBy)
      ? sortBy
      : undefined;
  }

  if (hasField(data, "sortOrder")) {
    data.sortOrder = toUpper(trimString(data.sortOrder));
  }

  if (hasField(data, "categoryCode")) {
    data.categoryCode = toUpper(trimString(data.categoryCode));
  }

  if (hasField(data, "categoryName")) {
    data.categoryName = trimString(data.categoryName);
  }

  return data;
}

module.exports = {
  formatCourseCategoryData,
  formatCourseCategoryQuery,
};
