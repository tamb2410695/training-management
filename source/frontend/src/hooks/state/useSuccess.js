import { useCallback, useState } from "react";

export function useSuccess() {
  const [success, setSuccessState] = useState(null);

  const setSuccess = useCallback((successData) => {
    setSuccessState({
      success: successData.success,
      successCode: successData.successCode,
      message: successData.message ?? "Success",
    });
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccessState(null);
  }, []);

  return {
    success,
    setSuccess,
    clearSuccess,
  };
}
