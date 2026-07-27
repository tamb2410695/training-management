import { useEffect } from "react";

function Toast({ message, title, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    if (!duration || !onClose) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) {
    return null;
  }

  const styles = {
    success: {
      className: "bg-success",
      title: "Thành công",
    },
    error: {
      className: "bg-danger",
      title: "Lỗi",
    },
    warning: {
      className: "bg-warning text-dark",
      title: "Lưu ý",
    },
    info: {
      className: "bg-primary",
      title: "Thông báo",
    },
  };

  const config = styles[type] ?? styles.info;

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
      <div
        className={`toast show align-items-center text-white ${config.className} border-0 shadow-lg`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex py-1">
          <div className="toast-body small">
            <strong className="me-2">{title ?? config.title}:</strong>

            {message}
          </div>

          {onClose && (
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Đóng"
              onClick={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Toast;
