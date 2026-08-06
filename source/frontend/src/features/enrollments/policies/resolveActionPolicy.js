export function resolveActionPolicy({ enrollment, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canRemove: enrollment.enrollmentStatus !== "DELETED" ,
    canRestore: enrollment.enrollmentStatus === "DELETED",
  };
}
