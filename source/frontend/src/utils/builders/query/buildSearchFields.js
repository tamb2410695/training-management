export function buildSearchFields({fields, overrides = {}}) {
  return Object.values(fields)
    .filter((field) => field.query?.searchable)
    .map((field) => {
      return {
        key: field.key,
        label: field.label,
      };
    });
}
