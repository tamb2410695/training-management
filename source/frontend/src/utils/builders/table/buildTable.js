import { TABLE_DEFAULTS } from "@/constants";
import { buildColumns } from "./buildColumns";

export function buildTable(fields, config = {}) {
  const table = structuredClone(TABLE_DEFAULTS);

  table.columns = buildColumns(fields);

  table.actions = {
    ...table.actions,
    ...config.actions,
  };

  table.selection = {
    ...table.selection,
    ...config.selection,
  };

  table.pagination = {
    ...table.pagination,
    ...config.pagination,
  };

  table.toolbar = {
    ...table.toolbar,
    ...config.toolbar,
  };

  table.appearance = {
    ...table.appearance,
    ...config.appearance,
  };

  return table;
}
