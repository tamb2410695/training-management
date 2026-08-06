export function formatDocumentTableData(documents, pagination) {
  return documents.map((document, index) => ({
    ...document,
    __index: (pagination.page - 1) * pagination.limit + index + 1,
  }));
}
