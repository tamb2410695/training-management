import { useQueryState } from "@/hooks";
import { useMemo } from "react";

export function useFeatureQuery(querySchema) {

  const query = useQueryState(querySchema.defaultQuery);

  const schema = useMemo(
    () => ({
      searchableFields: querySchema.searchableFields,
      sortableFields: querySchema.sortableFields,
      filterFields: querySchema.filterFields,
    }),
    [
      querySchema.searchableFields,
      querySchema.sortableFields,
      querySchema.filterFields,
    ],
  );

  return {
    ...query,
    schema,
  };
}
