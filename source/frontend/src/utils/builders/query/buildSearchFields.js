export function buildSearchFields(fields) {
  return Object.values(fields)
    .filter((field) => field.query?.searchable)
    .map((field) => ({
      key: field.key,
      label: field.label,
    }));
}
