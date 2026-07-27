import { useCallback, useMemo, useState } from "react";

export function useForm(initialData = {}) {
  const initialValues = useMemo(() => ({ ...initialData }), [initialData]);

  const [values, setValuesState] = useState(initialValues);
  const [errors, setErrorsState] = useState({});
  const [touched, setTouchedState] = useState({});
  const [isSubmitting, setSubmittingState] = useState(false);

  const setValue = useCallback((field, value) => {
    setValuesState((previous) => ({
      ...previous,
      [field]: value,
    }));

    setTouchedState((previous) => ({
      ...previous,
      [field]: true,
    }));
  }, []);

  const getValue = useCallback((field) => values[field], [values]);

  const patchValues = useCallback((data = {}) => {
    setValuesState((previous) => ({
      ...previous,
      ...data,
    }));
  }, []);

  const setValues = useCallback((data = {}) => {
    setValuesState(data);
  }, []);

  const setErrors = useCallback((errors = {}) => {
    setErrorsState(errors);
  }, []);

  const setFieldError = useCallback((field, error) => {
    setErrorsState((previous) => ({
      ...previous,
      [field]: error,
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrorsState({});
  }, []);

  const clearFieldError = useCallback((field) => {
    setErrorsState((previous) => {
      const next = { ...previous };

      delete next[field];

      return next;
    });
  }, []);

  const setTouched = useCallback((field, value = true) => {
    setTouchedState((previous) => ({
      ...previous,
      [field]: value,
    }));
  }, []);

  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrorsState({});
    setTouchedState({});
    setSubmittingState(false);
  }, [initialValues]);

  const clear = useCallback(() => {
    setValuesState({});
    setErrorsState({});
    setTouchedState({});
    setSubmittingState(false);
  }, []);

  const setSubmitting = useCallback((value) => {
    setSubmittingState(value);
  }, []);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  const hasErrors = useMemo(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  const isValid = useMemo(() => {
    return !hasErrors;
  }, [hasErrors]);

  return {
    values,
    errors,
    touched,

    isDirty,
    isValid,
    hasErrors,

    isSubmitting,

    setValues,
    setValue,
    getValue,
    patchValues,

    setErrors,
    setFieldError,
    clearErrors,
    clearFieldError,

    setTouched,

    setSubmitting,

    reset,
    clear,
  };
}
