export function buildValidationSchema(fields, mode = "create") {
  return Object.values(fields)
    .filter((field) => field.validation)
    .reduce((schema, field) => {
      const rules = [];

      if (field.validation.required?.[mode]) {
        rules.push({
          type: "required",
          message: `${field.label} là bắt buộc.`,
        });
      }

      rules.push(...(field.validation.rules ?? []));

      schema[field.key] = {
        key: field.key,
        label: field.label,
        type: field.type,
        rules,
      };

      return schema;
    }, {});
}
