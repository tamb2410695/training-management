export const QUERY_COMMON_FIELDS = {
  FIELDS: {
    PAGINATION: ["page", "limit", "offset"],
    SEARCH: ["search"],
    SORT: ["sortBy", "sortOrder"],
  },

  VALUES: {
    SORT_ORDERS: ["asc", "desc", "ASC", "DESC"],
  },

  get ALL_KEYS() {
    return [
      ...this.FIELDS.PAGINATION,
      ...this.FIELDS.SEARCH,
      ...this.FIELDS.SORT,
    ];
  },
};

export const QUERY_DEFAULTS = {
  page: 1,
  limit: 10,

  search: "",
  searchField: "",
  sortBy: "",
  sortOrder: "desc",
};
