export function resolveRolePolicy({ mode = "create", record }) {
  if (mode === "update" && record.roleCode === "STUDENT") {
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
