import { useCallback } from "react";
import { useFeedback } from "@/hooks";
import { errorHandler } from "@/utils";

export function useFeatureFeedback({ form } = {}) {
  const feedback = useFeedback();

  const handleError = (error) => {
    const result = errorHandler(error);

    if (Object.keys(result.fieldErrors).length) {
      form.setErrors(result.fieldErrors);
      return;
    }

    feedback.setError({
      type: "error",
      title: "Có lỗi xảy ra",
      message: result.message,
    });
  };

  const success = useCallback(
    (payload = {}) => {
      feedback.setSuccess({
        title: payload.title ?? "Thành công",
        message: payload.message ?? "Thao tác thành công",
      });
    },
    [feedback],
  );

  return {
    handleError,
    success,
  };
}
