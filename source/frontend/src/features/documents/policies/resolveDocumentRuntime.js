import { DOCUMENT_ROLES, DOCUMENT_STATUS } from "../constants";
import { resolveRolePolicy } from "./resolveRolePolicy";
import { resolveStatusPolicy } from "./resolveStatusPolicy";
import { resolveDocumentWorkflow } from "./resolveDocumentWorkflow";
import { resolveQueryPolicy } from "./resolveQueryPolicy";
import { resolveFormPlaceholder } from "./resolveFormPlaceholder";
import { resolveActionPolicy } from "./resolveActionPolicy";

export function resolveDocumentRuntime(context) {
  const rolePolicy = resolveRolePolicy(context);

  const statusPolicy = resolveStatusPolicy({
    currentStatus: context.record?.documentStatus,
  });

  const workflowPolicy = resolveDocumentWorkflow(context);
  const query = resolveQueryPolicy(context);

  const placeholderPolicy = resolveFormPlaceholder(context);

  return {
    form: {
      password: {
        ...placeholderPolicy,
      },
      roleCode: {
        disable: !rolePolicy.editable,
        options: DOCUMENT_ROLES.options.filter((x) =>
          rolePolicy.allowed.includes(x.value),
        ),
      },

      documentStatus: {
        readonly: statusPolicy.readonly ?? true,
        options: DOCUMENT_STATUS.options.filter((option) =>
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
