import { useCallback } from "react";

export function useFeatureSubmit({
  form,
  actions,
  modal,
  featureFeedback,
  buildPayload,
  fields,
  successMessages,
  idKey = "id",
}) {
  const submit = useCallback(async () => {
    try {
      const mode = modal.mode ?? "create";
      const payload = buildPayload(fields, form.values, mode);

      const validation = form.validate(payload, fields, mode);
      console.log(validation)

      if (!validation.valid) {
        featureFeedback.handleError(validation.error);
        return validation.error;
      }

      if (modal.isCreate) {
        await actions.create(payload);
        featureFeedback.success({ message: successMessages[mode].message });
      }

      if (modal.isUpdate) {
        await actions.update(modal.record[idKey], payload);
        featureFeedback.success({ message: successMessages[mode].message });
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
    successMessages,
  ]);

  return {
    submit,
  };
}
