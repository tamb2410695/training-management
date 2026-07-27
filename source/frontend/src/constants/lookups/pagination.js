export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  ALLOW_LIMIT: [10, 20, 50],
  MAX_LIMIT: 50,
};

export const DEFAULT_PAGINATION = {
  page: PAGINATION.DEFAULT_PAGE,
  limit: PAGINATION.DEFAULT_LIMIT,
  totalRecords: 0,
  totalPages: 1
}