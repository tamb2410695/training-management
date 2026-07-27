import { FeedbackContext } from "@/contexts";
import { useState } from "react";
import { useCallback } from "react";

export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState(null);

  const showFeedback = useCallback((payload) => {
    setFeedback({
      display: "toast",
      duration: 3000,
      ...payload,
    });
  }, []);

  const setSuccess = useCallback(
    (payload) => {
      showFeedback({
        type: "success",
        ...payload,
      });
    },
    [showFeedback],
  );

  const setError = useCallback(
    (payload) => {
      showFeedback({
        type: "error",
        duration: 5000,
        ...payload,
      });
    },
    [showFeedback],
  );

  const setStateError = useCallback((payload) => {
    setFeedback({
      display: "state",
      type: "error",
      ...payload,
    });
  }, []);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedback,

        setSuccess,
        setError,
        setStateError,

        clearFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
