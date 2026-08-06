import { REGISTRATION_ROLES } from "../constants";

export function resolveRolePolicy({ mode, registration, user }) {
  if (mode === "create") {
    return {
      field: {
        readonly: false,
      },
      options: REGISTRATION_ROLES.options,
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
    options: [registration.roleCode],
  };
}
