import { PAGINATION } from "./pagination";

export const TABLE_DEFAULTS = {
  columns: [],

  actions: {
    visible: true,
    width: 180,
    fixed: "right",
    items: [],
  },

  selection: {
    enabled: false,
    multiple: true,
  },

  pagination: {
    enabled: true,
    limit: PAGINATION.DEFAULT_LIMIT,
    allowLimit: PAGINATION.ALLOW_LIMIT,
  },

  sort: {
    key: null,
    order: "asc",
  },

  toolbar: {
    visible: true,
    create: true,
    refresh: true,
    search: true,
    filter: true,
    import: false,
    export: false,
  },

  appearance: {
    bordered: false,
    striped: false,
    hover: true,
    size: "default",
  },
};