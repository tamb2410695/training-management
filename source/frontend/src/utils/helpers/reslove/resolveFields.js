export function resolveFields({ fields, policy }) {
  const overrides = policy?.fields ?? {};

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
