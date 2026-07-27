import { resolveActionPolicy } from "./accountAction";
import { resolveRolePolicy } from "./accountRole";
import { resolveStatusPolicy } from "./accountStatus";
import { resolveAccountWorkflow } from "./accountWorkflow";

export function resolveAccountPolicy(context) {
  return {
    roleCode: resolveRolePolicy(context),
    accountStatus: resolveStatusPolicy({
      currentStatus: context.account?.accountStatus,
    }),
    actions: resolveActionPolicy(context),
    workflow: resolveAccountWorkflow(context),
  };
}
