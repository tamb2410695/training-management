export function buildExport(fields) {
  return Object.values(fields)
    .filter((field) => field.export !== false)
    .map((field) => ({
      key: field.key,
      header: field.label,
      type: field.type,
    }));
}
