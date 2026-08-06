import { COURSE_ROLES } from "../constants";

export function resolveRolePolicy({ mode, course, user }) {
  if (mode === "create") {
    return {
      field: {
        readonly: false,
      },
      options: COURSE_ROLES.options,
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
    options: [course.roleCode],
  };
}
