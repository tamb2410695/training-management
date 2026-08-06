export function resolveActionPolicy({ document, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canRemove: document.documentStatus !== "DELETED" ,
    canRestore: document.documentStatus === "DELETED",
  };
}
