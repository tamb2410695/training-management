import { buildForm } from "./buildForm";

export function buildWizard(fields, config = {}) {
  const formFields = buildForm({fields, mode: config.mode});

  const fieldMap = Object.fromEntries(
    formFields.map((field) => [field.key, field]),
  );

  const resolveFields = (fields) => {
    return fields.map((key) => fieldMap[key]).filter(Boolean);
  };

  return {
    mode: config.mode,
    steps: config.steps.map((step) => ({
      key: step.key,
      title: step.title,
      fields: resolveFields(step.fields),
    })),
  };
}
