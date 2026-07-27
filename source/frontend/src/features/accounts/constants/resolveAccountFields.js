export function resolveAccountFields({ fields, policy }) {
  return {
    ...fields,

    roleCode: {
      ...fields.roleCode,

      form: {
        ...fields.roleCode.form,

        readonly: policy.role.readonly,

        options: policy.role.options,
      },
    },

    accountStatus: {
      ...fields.accountStatus,

      form: {
        ...fields.accountStatus.form,

        options: policy.status.options,
      },
    },
  };
}
