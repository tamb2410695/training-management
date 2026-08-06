export function formatClasseTableData(classes, pagination) {
  return classes.map((classe, index) => ({
    ...classe,
    __index: (pagination.page - 1) * pagination.limit + index + 1,
  }));
}
