export function buildRequestParams(query = {}) {
  const {
    search,
    searchField,
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
  } = query;

  const params = {
    ...query,
    page,
    limit,
  };

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      params[key] = value.join(",");
    }
  });

  if (!search) {
    delete params.search;
    delete params.searchField;
  } else {
    params.search = search;
    params.searchField = searchField;
  }

  if (sortBy) {
    params.sortBy = sortBy;
    params.sortOrder = sortOrder;
  } else {
    delete params.sortBy;
    delete params.sortOrder;
  }

  return params;
}
