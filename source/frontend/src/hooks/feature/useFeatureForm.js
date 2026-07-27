/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useForm, useValidation } from "../state";

export function useFeatureForm({
  initialData = {},
  validationSchema = {},
  mode = "create",
} = {}) {
  const form = useForm(initialData);

  const validation = useValidation({schema: validationSchema[mode]});

  const validate = useCallback(
    (values = form.values) => {
      const result = validation.validate(values);

      if (!result.valid) {
        form.setErrors(result.errors);
      } else {
        form.clearErrors();
      }

      return result;
    },
    [form, validation],
  );

  const validateField = useCallback(
    (field) => {
      const error = validation.validateField(
        field,
        form.values[field],
      );

      if (error) {
        form.setFieldError(field, error);
        return false;
      }

      form.clearFieldError(field);

      return true;
    },
    [validation, form.values],
  );

  const submit = useCallback(
    async (handler) => {
      const result = validate();

      if (!result.valid) {
        return {
          success: false,
          errors: result.errors,
        };
      }

      try {
        form.setSubmitting(true);

        const response = await handler(form.values);

        return {
          success: true,
          data: response,
        };
      } finally {
        form.setSubmitting(false);
      }
    },
    [validate, form.values],
  );

  const applyServerErrors = useCallback((errors = {}) => {
    form.setErrors(errors);
  }, []);

  const resetForm = useCallback(
    (data) => {
      if (data) {
        form.setValues(data);
      }

      form.reset();
    },
    [form],
  );

  return {
    ...form,

    validate,
    validateField,

    submit,

    applyServerErrors,

    resetForm,

    validation,
  };
}
