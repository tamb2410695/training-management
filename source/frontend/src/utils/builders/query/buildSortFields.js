export function buildSortFields(fields) {
  const options = Object.values(fields)
    .filter((field) => field.query?.sortable)
    .map((field) => ({
      key: field.key,
      label: field.label,
    }));

  return options
}