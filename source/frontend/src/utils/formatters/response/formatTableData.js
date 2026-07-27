export function formatTableData(tableData, pagination) {
  const { page = 1, limit = 10 } = pagination;

  const startIndex = (page - 1) * limit;

  return tableData.map((data, index) => ({
    __index: startIndex + index + 1,
    ...data,
  }));
}
