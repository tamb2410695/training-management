import { resolveActionPolicy } from "./resolveActionPolicy";

export function resolveRegistrationRowRuntime({
  row,
  user,
  actions,
}) {
  const policy = resolveActionPolicy({
    registration: row,
    user,
  });

  const permissionMap = {
    view: policy.canView,
    update: policy.canEdit,
    remove: policy.canRemove,
    restore: policy.canRestore,
  };

  return {
    ...row,

    actions: actions
      .filter((action) => permissionMap[action.key])
      .map((action) => ({
        ...action,
        onClick: () => action.onClick(row),
      })),
  };
}
