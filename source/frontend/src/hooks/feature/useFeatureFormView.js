export function useFeatureFormView({ modal, form, schema }) {
  const mode = modal.isCreate ? "create" : "update";

  const formSchema = schema.forms[mode];

  const viewSchema = schema.view;

  return {
    mode,
    values: form.values,
    setValue: form.setValue,

    formSchema,
    viewSchema,
    isWizard: schema.wizard?.mode === mode,
    wizardSchema: schema.wizard?.mode === mode ? schema.wizard : null,
  };
}
