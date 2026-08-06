import { ENROLLMENT_STATUS } from "../constants";
import { resolveRolePolicy } from "./resolveRolePolicy";
import { resolveStatusPolicy } from "./resolveStatusPolicy";
import { resolveQueryPolicy } from "./resolveQueryPolicy";

export function resolveEnrollmentRuntime(context) {
  const rolePolicy = resolveRolePolicy(context);

  const statusPolicy = resolveStatusPolicy({
    currentStatus: context.record?.enrollmentStatus,
  });

  const query = resolveQueryPolicy(context);


  return {
    form: {
      enrollmentStatus: {
        disable: !rolePolicy.editable,
        readonly: statusPolicy.readonly ?? true,
        options: ENROLLMENT_STATUS.options.filter((option) =>
          statusPolicy.options.includes(option.value),
        ),
      },
    },

    query: {
      filterFields: {
        ...query.filterFields,
      },
    },
  };
}
