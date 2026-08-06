export function formatCoureCategorieTableData(coureCategories, pagination) {
  return coureCategories.map((coureCategorie, index) => ({
    ...coureCategorie,
    __index: (pagination.page - 1) * pagination.limit + index + 1,
  }));
}
