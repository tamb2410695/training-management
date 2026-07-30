import { ACCOUNT_ROLES, ACCOUNT_STATUS } from "../constants";
import { resolveRolePolicy } from "./resolveRolePolicy";
import { resolveStatusPolicy } from "./resolveStatusPolicy";
import { resolveAccountWorkflow } from "./resolveAccountWorkflow";
import { resolveQueryPolicy } from "./resolveQueryPolicy";
import { resolveFormPlaceholder } from "./resolveFormPlaceholder";

export function resolveAccountRuntime(context) {
  const rolePolicy = resolveRolePolicy(context);

  const statusPolicy = resolveStatusPolicy({
    currentStatus: context.record?.accountStatus,
  });

  const workflowPolicy = resolveAccountWorkflow(context);
  const query = resolveQueryPolicy(context);

  const placeholderPolicy = resolveFormPlaceholder(context);

  return {
    form: {
      password: {
        ...placeholderPolicy,
      },
      roleCode: {
        disable: !rolePolicy.editable,
        options: ACCOUNT_ROLES.options.filter((x) =>
          rolePolicy.allowed.includes(x.value),
        ),
      },

      accountStatus: {
        readonly: statusPolicy.readonly ?? true,
        options: ACCOUNT_STATUS.options.filter((option) =>
          statusPolicy.options.includes(option.value),
        ),
      },
    },

    query: {
      filterFields: {
        ...query.filterFields,
      },
    },

    wizard: {
      mode: "create",
      ...workflowPolicy,
    },
  };
}
