import { COURSE_STATUS } from "../constants";
import { resolveRolePolicy } from "./resolveRolePolicy";
import { resolveStatusPolicy } from "./resolveStatusPolicy";
import { resolveQueryPolicy } from "./resolveQueryPolicy";
import { resolveFormPlaceholder } from "./resolveFormPlaceholder";

export function resolveCourseRuntime(context) {
  const rolePolicy = resolveRolePolicy(context);

  const statusPolicy = resolveStatusPolicy({
    currentStatus: context.record?.courseStatus,
  });

  const query = resolveQueryPolicy(context);

  const placeholderPolicy = resolveFormPlaceholder(context);

  return {
    form: {
      password: {
        ...placeholderPolicy,
      },

      courseStatus: {
        disable: !rolePolicy.editable,
        readonly: statusPolicy.readonly ?? true,
        options: COURSE_STATUS.options.filter((option) =>
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
