export function buildToolbar(toolbar = {}) {
  return {
    search: toolbar.search ?? true,
    filter: toolbar.filter ?? true,
    refresh: toolbar.refresh ?? true,
    create: toolbar.create ?? false,
  };
}
