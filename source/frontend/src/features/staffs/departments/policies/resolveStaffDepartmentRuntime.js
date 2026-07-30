import { STAFF_STATUS } from "../constants";
import { resolveFormPlaceholder } from "./resolveFormPlaceholder";
import { resolveQueryPolicy } from "./resolveQueryPolicy";
import { resolveStatusPolicy } from "./resolveStatusPolicy";

export function resolveStaffDepartmentsRuntime(context) {
  const statusPolicy = resolveStatusPolicy({
    currentStatus: context.record?.staffStatus,
  });

  const placeholderPolicy = resolveFormPlaceholder(context);

  const query = resolveQueryPolicy(context)

  return {
    form: {
      password: {
        ...placeholderPolicy,
      },

      staffStatus: {
        readonly: statusPolicy.readonly ?? true,
        options: STAFF_STATUS.options.filter((option) =>
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
