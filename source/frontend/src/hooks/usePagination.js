import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PAGE_LIMIT } from "../constants";

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasNextPage, setHasNextPage] = useState(false);

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get('limit')) || PAGE_LIMIT.DEFAULT_LIMIT;

  const updateUrl = (newParams) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, ...newParams });
  };

  const nextPage = () => {
    if (hasNextPage) {
      updateUrl({ page: currentPage + 1 });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      updateUrl({ page: currentPage - 1 });
    }
  };

  const changeLimit = (newLimit) => {
    const numericLimit = parseInt(newLimit, 10);
    
    if (PAGE_LIMIT.ALLOWED_LIMITS.includes(numericLimit)) {
      updateUrl({ limit: numericLimit, page: 1 });
    } else {
      updateUrl({ limit: PAGE_LIMIT.DEFAULT_LIMIT, page: 1 });
    }
  };

  return {
    currentPage,
    limit,
    hasNextPage,
    nextPage,
    prevPage,
    changeLimit,
    setHasNextPage,
    allowedLimits: PAGE_LIMIT.ALLOWED_LIMITS
  };
};
