import { DOCUMENT_ROLES } from "../constants";

export function resolveRolePolicy({ mode, document, user }) {
  if (mode === "create") {
    return {
      field: {
        readonly: false,
      },
      options: DOCUMENT_ROLES.options,
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
    options: [document.roleCode],
  };
}
