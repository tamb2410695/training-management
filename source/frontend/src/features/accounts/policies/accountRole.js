export function resolveRolePolicy({ mode, account }) {
  if (mode === "update" && account.roleCode === "STUDENT") {
    return {
      editable: false,
      allowed: ["STUDENT"],
    };
  }

  return {
    editable: true,
    allowed: ["ADMIN", "INSTRUCTOR"],
  };
}
