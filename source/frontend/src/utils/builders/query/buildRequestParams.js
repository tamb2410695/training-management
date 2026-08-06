export function buildRequestParams(query = {}) {
  const {
    search,
    searchField,
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    ...rest
  } = query;

  const params = {
    page,
    limit,
  };

  Object.entries(rest).forEach(([key, value]) => {
    if (
      value === "" ||
      value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return;
    }

    params[key] = Array.isArray(value) ? value.join(",") : value;
  });

  if (search) {
    params.search = search;
    params.searchField = searchField;
  }

  if (sortBy) {
    params.sortBy = sortBy;
    params.sortOrder = sortOrder;
  }

  return params;
}
