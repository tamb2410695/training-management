export function resolveActionPolicy({ coureCategorie, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canRemove: coureCategorie.coureCategorieStatus !== "DELETED" ,
    canRestore: coureCategorie.coureCategorieStatus === "DELETED",
  };
}
