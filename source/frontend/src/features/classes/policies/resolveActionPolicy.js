export function resolveActionPolicy({ classe, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canRemove: classe.classesStatus !== "DELETED" ,
    canRestore: classe.classesStatus === "DELETED",
  };
}
