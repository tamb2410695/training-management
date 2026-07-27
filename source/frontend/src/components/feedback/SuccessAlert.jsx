function SuccessAlert({
  message,
  title = "Thành công",
  onClose,
  dismissible = true,
}) {
  if (!message) return null;

  return (
    <div
      className={`alert alert-success d-flex align-items-center ${
        dismissible && onClose ? "alert-dismissible" : ""
      } fade show border-0 shadow-sm`}
      role="alert"
    >
      <div className="flex-grow-1">
        {title && <div className="fw-bold mb-1">{title}</div>}

        <div className="small fw-medium text-success-emphasis">{message}</div>
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
  );
}

export default SuccessAlert;
