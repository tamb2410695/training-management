import { useCallback, useState } from "react";
import { errorHandler } from "@/utils/errors/errorHandler";

export function useError() {
  const [fieldErrors, setFieldErrors] = useState({});

  const [serverError, setServerError] = useState(null);

  const setFieldError = useCallback((field, error) => {
    setFieldErrors((previous) => ({
      ...previous,
      [field]: error,
    }));
  }, []);

  const setServerErrorMessage = useCallback((error) => {
    setServerError(error ?? null);
  }, []);

  const handleError = useCallback((error) => {
    const result = errorHandler(error);

    if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors);
    }

    if (result.serverError) {
      setServerError(result.serverError);
    }

    return result;
  }, []);

  const clearErrors = useCallback(() => {
    setFieldErrors({});
    setServerError(null);
  }, []);

  const clearFieldError = useCallback((field) => {
    setFieldErrors((prev) => {
      const newErrors = {
        ...prev,
      };

      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    fieldErrors,
    serverError,
    setFieldError: setFieldError,
    setServerError: setServerErrorMessage,
    handleError,
    clearErrors,
    clearFieldError,
  };
}
