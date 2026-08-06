import { REGISTRATION_STATUS } from "../constants";
import { resolveRolePolicy } from "./resolveRolePolicy";
import { resolveStatusPolicy } from "./resolveStatusPolicy";
import { resolveQueryPolicy } from "./resolveQueryPolicy";
export function resolveRegistrationRuntime(context) {
  const rolePolicy = resolveRolePolicy(context);

  const statusPolicy = resolveStatusPolicy({
    currentStatus: context.record?.registrationStatus,
  });

  const query = resolveQueryPolicy(context);


  return {
    form: {
      registrationStatus: {
        disable: !rolePolicy.editable,
        readonly: statusPolicy.readonly ?? true,
        options: REGISTRATION_STATUS.options.filter((option) =>
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
