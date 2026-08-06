export function resolveActionPolicy({ staff, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canRemove: staff.staffStatus !== "DELETED",
    canRestore: staff.staffStatus === "DELETED",
  };
}
