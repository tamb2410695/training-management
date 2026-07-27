import { useFeedback } from "@/hooks";
import ConfirmModal from "./ConfirmModal";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import Toast from "./Toast";

function FeedbackRenderer() {
  const { feedback, clearFeedback } = useFeedback();

  if (!feedback) {
    return null;
  }

  if (feedback.display === "alert") {
    if (feedback.type === "success") {
      return (
        <SuccessAlert
          title={feedback.title}
          message={feedback.message}
          onClose={clearFeedback}
        />
      );
    }

    if (feedback.type === "error") {
      return (
        <ErrorAlert
          title={feedback.title}
          message={feedback.message}
          onClose={clearFeedback}
        />
      );
    }
  }

  if (feedback.type === "confirm") {
    return (
      <ConfirmModal
        {...feedback}
        onConfirm={() => {
          feedback.onConfirm?.();
          clearFeedback();
        }}
        onCancel={clearFeedback}
      />
    );
  }

  return (
    <Toast
      type={feedback.type}
      title={feedback.title}
      message={feedback.message}
      duration={feedback.duration}
      onClose={clearFeedback}
    />
  );
}

export default FeedbackRenderer;
