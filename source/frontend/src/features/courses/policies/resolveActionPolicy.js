export function resolveActionPolicy({ course, user }) {
  return {
    canView: true,
    canEdit: user.roleCode === "ADMIN",
    canRemove: course.courseStatus !== "DELETED" ,
    canRestore: course.courseStatus === "DELETED",
  };
}
