export function resolveActionPolicy({ account, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canDelete: account.accountStatus !== "DELETED",
    canRestore: account.accountStatus === "DISABLED",
  };
}
