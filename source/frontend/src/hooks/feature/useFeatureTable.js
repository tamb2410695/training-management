import { useMemo } from "react";
import { usePagination, useSelection } from "../data";
import { useActions } from "../state/useActions";
import { buildTableRows } from "@/utils/builders/table/buildTableRows";

function useFeatureRows({
  items,
  pagination,
  resolveRowRuntime,
  rowRuntimeContext,
}) {
  
  return useMemo(
    () =>
      buildTableRows(items, pagination, resolveRowRuntime, rowRuntimeContext),
    [items, pagination, resolveRowRuntime, rowRuntimeContext],
  );
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

  context,
  resolveRowRuntime,
  queryState,
}) {
  const tableActions = useActions(config, actions);

  const rows = useFeatureRows({
    items,
    pagination,
    resolveRowRuntime,
    rowRuntimeContext: {
      ...context,
      actions: tableActions,
    },
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
