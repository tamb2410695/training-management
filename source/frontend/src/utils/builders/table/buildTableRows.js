export function buildTableRows(
  rows,
  pagination,
  resolveRowRuntime,
  rowRuntimeContext = {},
) {
  const { page = 1, limit = 10 } = pagination;
  const startIndex = (page - 1) * limit;

  return rows.map((row, index) => {
    const baseRow = {
      __index: startIndex + index + 1,
      ...row,
    };

    return resolveRowRuntime
      ? resolveRowRuntime({ row: baseRow, ...rowRuntimeContext })
      : baseRow;
  });
}
