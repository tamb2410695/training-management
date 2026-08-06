import { CLASSE_ROLES } from "../constants";

export function resolveRolePolicy({ mode, classe, user }) {
  if (mode === "create") {
    return {
      field: {
        readonly: false,
      },
      options: CLASSE_ROLES.options,
    };
  }

  if (user.roleCode === "ADMIN") {
    
    return {
      field: {
        readonly: false,
      },
      options: ["ADMIN", "INSTRUCTOR", "STUDENT"],
    };
  }

  return {
    field: {
      readonly: true,
    },
    options: [classe.roleCode],
  };
}
