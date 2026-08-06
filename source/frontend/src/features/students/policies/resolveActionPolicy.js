export function resolveActionPolicy({ student, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canRemove: student.studentStatus !== "DELETED",
    canRestore: student.studentStatus === "DELETED",
  };
}
