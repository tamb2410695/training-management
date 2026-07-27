import { formatTableData } from "@/utils";
import { useMemo } from "react";
import { usePagination, useSelection } from "../data";
import { useActions } from "../state/useActions";

function useFeatureRows({ items, pagination }) {
  return useMemo(() => formatTableData(items, pagination), [items, pagination]);
}

export function useFeaturePagination({ tablePagination, queryState }) {
  const pagination = usePagination({ tablePagination, queryState });
  return {
    ...pagination,

    page: tablePagination?.page ?? pagination.page,
    limit: tablePagination?.limit ?? pagination.limit,
    total: tablePagination?.totalRecords ?? 0,
    totalPages: tablePagination?.totalPages ?? 1,
  };
}

export function useFeatureTable({
  actions = {},
  config = [],
  columns,
  loading,
  rowKey,
  items,
  pagination,

  queryState,
}) {
  const tableActions = useActions(config, actions);

  const rows = useFeatureRows({
    items,
    pagination,
  });

  const selection = useSelection();

  return {
    rowKey,
    rows,
    selection,
    columns,
    actions: tableActions,
    loading,
    pagination: useFeaturePagination({
      tablePagination: pagination,
      queryState,
    }),
  };
}
