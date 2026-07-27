export function resolveFields({ fields, context }) {
  const overrides = context.policy?.fields ?? {};

  return Object.entries(fields).reduce((result, [key, field]) => {
    result[key] = {
      ...field,

      form: {
        ...field.form,

        ...(overrides[key] ?? {}),
      },
    };

    return result;
  }, {});
}
