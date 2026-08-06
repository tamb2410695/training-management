import { ENROLLMENT_ROLES } from "../constants";

export function resolveRolePolicy({ mode, enrollment, user }) {
  if (mode === "create") {
    return {
      field: {
        readonly: false,
      },
      options: ENROLLMENT_ROLES.options,
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
    options: [enrollment.roleCode],
  };
}
