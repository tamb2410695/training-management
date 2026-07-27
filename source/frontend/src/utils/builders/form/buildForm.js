export function buildForm({ fields, mode = "create", overrides = {} }) {
  return Object.values(fields)
    .filter((field) => field.form?.visible !== false)
    .map((field) => {
      const override = overrides[field.key] ?? {};

      return {
        key: field.key,
        label: field.label,
        type: field.type,
        defaultValue: field.defaultValue,
        component: override.component ?? field.form?.component ?? field.type,
        placeholder: override.placeholder ?? field.form?.placeholder ?? "",
        readonly: override.readonly ?? field.form?.readonly ?? false,
        disabled: override.disabled ?? field.form?.disabled?.[mode] ?? false,
        required:
          override.required ?? field.validation?.required?.[mode] ?? false,
        rules: override.rules ?? field.validation?.rules ?? [],
        options: override.options ?? field.enum?.options ?? [],
        layout: override.layout ??
          field.form?.layout ?? {
            col: 12,
          },
      };
    });
}
