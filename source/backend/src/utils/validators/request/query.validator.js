const { QUERY_COMMON_FIELDS } = require("@/constants");
const { hasField, throwIf } = require("@/utils/helpers");
const { validatePagination } = require("../common");
const { BadRequestError } = require("@/utils/errors");

function queryValidator(data, searchable, sortable) {

  if (hasField(data, "page") || hasField(data, "limit")) {
    validatePagination(data.page, data.limit);
  }

  if (hasField(data, "searchField")) {
    throwIf(
      !searchable.includes(data.searchField),
      BadRequestError,
      "Invalid search field",
    );
  }

  if (hasField(data, "sortBy")) {
    throwIf(
      !sortable.includes(data.sortBy),
      BadRequestError,
      "Invalid sort field",
    );
  }

  if (hasField(data, "sortOrder")) {
    throwIf(
      !Object.values(QUERY_COMMON_FIELDS.VALUES.SORT_ORDERS).includes(
        data.sortOrder,
      ),
      BadRequestError,
      "Invalid sort order",
    );
  }

}

module.exports = {
  queryValidator
}