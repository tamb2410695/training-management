import { useState } from "react";

export const useFilter = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  return {
    filters,
    setFilters,
  };
};
