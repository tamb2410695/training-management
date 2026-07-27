import { useCallback } from "react";

export function usePagination({ tablePagination, queryState }) {
  const { query, updateQuery } = queryState;

  const page = tablePagination?.page ?? (tablePagination?.offset ?? 0) + 1;
  const limit = tablePagination?.limit ?? query.limit ?? 10;
  const totalPages = tablePagination?.totalPages ?? 1;

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      updateQuery({
        page: page + 1,
      });
    }
  }, [page, totalPages, updateQuery]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      updateQuery({
        page: page - 1,
      });
    }
  }, [page, updateQuery]);

  const setPage = useCallback(
    (value) => {
      const newPage = Number(value);

      if (newPage >= 1 && newPage <= totalPages) {
        updateQuery({
          page: newPage,
        });
      }
    },
    [totalPages, updateQuery],
  );

  const setLimit = useCallback(
    (value) => {
      updateQuery({
        limit: Number(value),
        page: 1,
      });
    },
    [updateQuery],
  );

  return {
    page,
    limit,

    total: tablePagination?.totalRecords ?? 0,
    totalPages,

    hasNext: page < totalPages,
    hasPrev: page > 1,

    nextPage,
    prevPage,

    setPage,
    setLimit,
  };
}
