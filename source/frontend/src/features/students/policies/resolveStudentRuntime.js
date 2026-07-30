import { STUDENT_STATUS } from "../constants";
import { resolveFormPlaceholder } from "./resolveFormPlaceholder";
import { resolveQueryPolicy } from "./resolveQueryPolicy";
import { resolveStatusPolicy } from "./resolveStatusPolicy";

export function resolveStudentRuntime(context) {
  const statusPolicy = resolveStatusPolicy({
    currentStatus: context.record?.studentStatus,
  });

  const placeholderPolicy = resolveFormPlaceholder(context);

  const query = resolveQueryPolicy(context)

  return {
    form: {
      password: {
        ...placeholderPolicy,
      },
      
      studentStatus: {
        readonly: statusPolicy.readonly ?? true,
        options: STUDENT_STATUS.options.filter((option) =>
          statusPolicy.options.includes(option.value),
        ),
      },
    },

    query: {
      filterFields: {
        ...query.filterFields
      }
    },

    wizard: {
      mode: "create",
    },
  };
}
