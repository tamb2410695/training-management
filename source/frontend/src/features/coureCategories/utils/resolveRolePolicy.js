import { COURECATEGORIE_ROLES } from "../constants";

export function resolveRolePolicy({ mode, coureCategorie, user }) {
  if (mode === "create") {
    return {
      field: {
        readonly: false,
      },
      options: COURECATEGORIE_ROLES.options,
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
    options: [coureCategorie.roleCode],
  };
}
