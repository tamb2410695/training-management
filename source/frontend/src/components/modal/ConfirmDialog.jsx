function ConfirmDialog({
  open,
  title,
  message,
  type = "danger",
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  const btnClass = `btn btn-${type} px-4`;
  const titleClass = `mb-0 fw-bold text-${type}`;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-start pt-5"
      style={{ zIndex: 1100 }}
    >
      <div
        className="card p-4 mx-auto shadow-lg border-0"
        style={{ width: "400px", marginTop: "10vh" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={titleClass}>{title || "Xác nhận hành động"}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        <div className="mb-4">
          <p
            className="text-secondary mb-0 small"
            style={{ whiteSpace: "pre-line" }}
          >
            {message ||
              "Bạn có chắc chắn muốn thực hiện hành động này? Thao tác này không thể hoàn tác."}
          </p>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-light" onClick={onClose}>
            Hủy bỏ
          </button>
          <button type="button" className={btnClass} onClick={onConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
