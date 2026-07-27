import { buildForm } from "@/utils";
import { resolveRolePolicy } from "../policies/accountRole";
import { ACCOUNT_FIELDS, ACCOUNT_ROLES, ACCOUNT_STATUS } from "../constants";
import { resolveStatusPolicy } from "../policies/accountStatus";

export function useAccountSchema({ mode, account }) {
  const rolePolicy = resolveRolePolicy({
    mode,
    account,
  });

  const allowedStatus = account
    ? resolveStatusPolicy({
        currentStatus: account.accountStatus,
      })
    : [];

  const fields = buildForm({
    fields: ACCOUNT_FIELDS,
    mode,
    overrides: {
      roleCode: {
        disabled: !rolePolicy.editable,
        options: ACCOUNT_ROLES.options.filter((x) =>
          rolePolicy.allowed.includes(x.value),
        ),
      },
      accountStatus: {
        options: ACCOUNT_STATUS.options.filter((option) =>
          allowedStatus.includes(option.value),
        ),
      },
    },
  });

  return {
    fields,
  };
}
