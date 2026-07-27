export function buildColumns(fields) {
  return Object.values(fields)
    .filter((field) => field.table?.visible !== false)
    .map((field) => ({
      key: field.key,
      label: field.label,
      type: field.type,
      enum: field.enum,
      width: field.table?.width ?? 180,
      align: field.table?.align ?? "left",
      nowrap: field.table?.nowrap ?? true,
      formatter: field.table?.formatter ?? null,
      renderer: field.table?.renderer ?? null,
    }));
}
