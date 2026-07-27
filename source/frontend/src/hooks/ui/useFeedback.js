import { FeedbackContext } from "@/contexts";
import { useContext } from "react";

export function useFeedback() {

  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useFeedback must be used inside FeedbackProvider");
  }

  return context;
}
