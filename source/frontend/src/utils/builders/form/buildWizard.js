import { buildForm } from "./buildForm";

export function buildWizard({ fields, config = {}, overrides = {} }) {
  const formFields = buildForm({ fields, mode: config.mode, overrides: overrides.form });

  function resolveFields(stepFields, fields) {
  const fieldMap = Object.fromEntries(
    fields.map(field => [field.key, field])
  );

  return stepFields
    .map(key => fieldMap[key])
    .filter(Boolean);
}
  return {
    mode: config.mode,
    steps: config.steps.map((step) => ({
      key: step.key,
      title: step.title,
      fields: resolveFields(step.fields, formFields),
    })),
  };
}
