export function resolveActionPolicy({ registration, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canRemove: registration.registrationStatus !== "DELETED" ,
    canRestore: registration.registrationStatus === "DELETED",
  };
}
