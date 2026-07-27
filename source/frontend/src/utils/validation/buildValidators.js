import { validatorMap } from "./validatorMap";

export function buildValidators(validationSchema) {
  return Object.fromEntries(
    Object.entries(validationSchema)
      .map(([key, field]) => {
        const rules = field.rules.map((rule) => {
          const validator = validatorMap[rule.type];
          return {
            rule,
            validate(value, data) {
              return validator(value, rule.value, data);
            },
          };
        });
        return [key, rules];
      }),
  );
}


export function buildValidation(fields) {
  return Object.values(fields)
    .filter(field => field.validation)
    .reduce((schema, field) => {

      schema[field.key] = {
        key: field.key,

        label: field.label,

        type: field.type,

        required:
          field.validation.required,

        rules:
          field.validation.rules ?? [],

        trigger:
          field.validation.trigger ?? "blur",
      };

      return schema;

    }, {});
}
