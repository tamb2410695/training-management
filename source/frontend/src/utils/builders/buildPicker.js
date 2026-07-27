import { buildTable } from "./table/buildTable";

export function buildPicker(fields, config = {}) {
  return {
    mode: config.mode ?? "single",
    columns: buildTable(fields),
    searchable: true,
    selection: {
      enabled: true,

      bulkActions: [],
    },
  };
}
