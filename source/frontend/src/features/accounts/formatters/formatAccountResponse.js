export function formatAccountResponse(account) {
  return {
    id: account.accountId,
    email: account.email,
    role: account.roleName,
  };
}
