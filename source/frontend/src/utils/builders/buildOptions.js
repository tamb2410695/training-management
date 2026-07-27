export function buildSearchOptions(fields) {
  return Object.values(fields)
    .filter((field) => field.query.searchable)
    .map(({ key, label }) => ({ value: key, label }));
}

export function buildSortOptions(fields) {
  return Object.values(fields)
    .filter((field) => field.query.sortable)
    .map((field) => ({
      label: field.label,
      value: field.key,
    }));
}
