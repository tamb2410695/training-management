export function formatAccountTableData(accounts, pagination) {
  return accounts.map((account, index) => ({
    ...account,
    __index: (pagination.page - 1) * pagination.limit + index + 1,
  }));
}
