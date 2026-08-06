export function resolveActionPolicy({ account, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canRemove: account.accountStatus !== "DELETED" ,
    canRestore: account.accountStatus === "DELETED",
  };
}
