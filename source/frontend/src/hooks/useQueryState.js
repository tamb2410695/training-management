import { useState } from "react";

export const useQueryState = (defaultQuery) => {
  const [query, setQuery] = useState(defaultQuery);

  const updateQuery = (updates) => {
    setQuery((previous) => ({
      ...previous,
      ...updates,
    }));
  };

  const resetQuery = () => {
    setQuery(defaultQuery);
  };

  return {
    query,
    updateQuery,
    resetQuery,
    setQuery,
  };
};
