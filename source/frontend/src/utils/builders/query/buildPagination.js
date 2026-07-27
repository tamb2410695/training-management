export const buildPagination = (pagination) => {
  const page = pagination.offset / pagination.limit + 1;

  return {
    ...pagination,
    page,
    hasPrevious: page > 1,
    hasNext: page < pagination.totalPages,
  };
};

// import {
//  PAGINATION_DEFAULTS
// } from "@/core/constants";

// export function buildPagination(
//     config={}
// ){
//     return {
//         enabled:
//             config.enabled ?? true,
//         pageSize:
//             config.pageSize
//             ??
//             PAGINATION_DEFAULTS.pageSize,
//         pageSizes:
//             config.pageSizes
//             ??
//             PAGINATION_DEFAULTS.pageSizes
//     };
// }
