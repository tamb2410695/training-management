import { useCallback } from "react";

export function useFeatureSubmit({
  form,
  actions,
  modal,
  featureFeedback,
  buildPayload,
  fields,
  messages,
  idKey = "id",
}) {
  const submit = useCallback(async () => {
    try {
      const payload = buildPayload(fields, form.values, modal.mode);

      const validation = form.validate(payload, fields, modal.mode);

      if (!validation.valid) {
        return false;
      }

      if (modal.isCreate) {
        await actions.create(payload);
        featureFeedback.success(messages.create);
      }

      if (modal.isUpdate) {
        await actions.update(modal.record[idKey], payload);
        featureFeedback.success(messages.update);
      }

      modal.close();

      form.reset();

      return true;
    } catch (error) {
      featureFeedback.handleError(error);
      return false;
    }
  }, [
    form,
    actions,
    modal,
    featureFeedback,
    idKey,
    buildPayload,
    fields,
    messages,
  ]);

  return {
    submit,
  };
}
