import { CLASS_STATUS } from "../constants";
import { resolveRolePolicy } from "./resolveRolePolicy";
import { resolveStatusPolicy } from "./resolveStatusPolicy";
import { resolveQueryPolicy } from "./resolveQueryPolicy";

export function resolveClasseRuntime(context) {
  const rolePolicy = resolveRolePolicy(context);

  const statusPolicy = resolveStatusPolicy({
    currentStatus: context.record?.classeStatus,
  });

  const query = resolveQueryPolicy(context);
  return {
    form: {

      classesStatus: {
        disable: !rolePolicy.editable,
        readonly: statusPolicy.readonly ?? true,
        options: CLASS_STATUS.options.filter((option) =>
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
