import { useCallback, useState } from "react";

import { FeedbackContext } from "@/contexts";

const DEFAULT_DURATION = 3000;

const DEFAULT_DURATION_BY_TYPE = {
  success: 3000,
  info: 3000,
  warning: 4000,
  error: 5000,
};

export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState(null);

  const showFeedback = useCallback((payload) => {
    const { display = "toast", type = "info", duration, ...rest } = payload;

    setFeedback({
      display,
      type,
      duration:
        duration ??
        (display === "toast"
          ? (DEFAULT_DURATION_BY_TYPE[type] ?? DEFAULT_DURATION)
          : undefined),
      ...rest,
    });
  }, []);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        showFeedback,
        clearFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
