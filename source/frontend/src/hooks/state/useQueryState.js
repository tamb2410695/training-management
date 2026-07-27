import { serializeQuery } from "@/utils";
import { useCallback, useState } from "react";

export const useQueryState = (defaultQuery) => {
  const [query, setQuery] = useState(defaultQuery);
  const [refreshKey, setRefreshKey] = useState(0);

  const updateQuery = useCallback((updates) => {
    setQuery((previous) => ({
      ...previous,
      ...updates,
    }));
  }, []);

  const buildQuery = useCallback(
    (overrides = {}) => ({
      ...query,
      ...overrides,
    }),
    [query],
  );

  const serialize = useCallback(
    (overrides = {}) =>
      serializeQuery({
        ...query,
        ...overrides,
      }),
    [query],
  );

  const resetQuery = useCallback(() => {
    setQuery(structuredClone(defaultQuery));
  }, [defaultQuery]);

  const refresh = useCallback(() => {
    setRefreshKey((previous) => previous + 1);
  }, []);

  return {
    query,
    updateQuery,
    resetQuery,
    refresh,
    refreshKey,
    setQuery,
    serialize,
    buildQuery,
  };
};
