import { runValidator, validateForm } from "@/utils";
import { useCallback, useMemo } from "react";

export function useValidation({ schema = {} }) {
  const validate = useCallback(
    (values = {}) => {
      return validateForm(schema, values);
    },
    [schema],
  );

  const validateField = useCallback(
    (field, value) => {
      const fieldSchema = schema[field];

      if (!fieldSchema) {
        return null;
      }

      return runValidator(fieldSchema, value);
    },
    [schema],
  );

  const fields = useMemo(() => Object.keys(schema), [schema]);

  return {
    validate,
    validateField,
    fields,
  };
}
