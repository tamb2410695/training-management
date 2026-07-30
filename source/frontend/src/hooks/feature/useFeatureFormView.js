export function useFeatureFormView({ modal, form, schema }) {
  const mode = modal.mode;

  const formSchema = schema.form[mode];

  return {
    mode,
    values: form.values,
    setValue: form.setValue,

    formSchema,
    isWizard: schema.wizard?.mode === mode,
    wizardSchema: schema.wizard,
  };
}
