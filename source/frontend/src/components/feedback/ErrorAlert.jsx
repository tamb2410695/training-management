function ErrorAlert({
  message,
  title = "Có lỗi xảy ra",
  onClose,
  dismissible = true,
}) {
  if (!message) return null;

  return (
    <div
      className="alert alert-danger border-0 shadow-sm fade show"
      role="alert"
    >
      <div className="d-flex align-items-center gap-3">
        <div className="flex-shrink-0">
          <i className="bi bi-exclamation-triangle-fill fs-5" />
        </div>

        <div className="flex-grow-1">
          {title && <div className="fw-bold mb-1">{title}</div>}

          <div className="small">{message}</div>
        </div>

        {dismissible && onClose && (
          <button
            type="button"
            className="btn-close"
            aria-label="Đóng"
            onClick={onClose}
          />
        )}
      </div>
    </div>
  );
}

export default ErrorAlert;
