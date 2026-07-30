export function buildSortFields({fields, overrides = {}}) {
  return Object.values(fields)
    .filter((field) => field.query?.sortable)
    .map((field) => ({
      key: field.key,
      label: field.label,
    }));

}