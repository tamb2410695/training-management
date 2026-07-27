import { ACCOUNT_ROLES } from "../constants";

export function resolveRolePolicy({ mode, account, user }) {
  if (mode === "create") {
    return {
      field: {
        readonly: false,
      },
      options: ACCOUNT_ROLES.options,
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
    options: [account.roleCode],
  };
}
