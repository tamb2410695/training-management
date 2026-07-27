function AccountDeleteModal({ open, account, onClose, onConfirm }) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-start pt-5"
      style={{ zIndex: 1050 }}
    >
      <div className="card p-4 mx-auto w-25 shadow-lg border-0 mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 text-danger fw-bold">Xóa Tài Khoản</h4>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>

        <div className="mb-4">
          <p className="text-muted mb-1">
            Bạn có chắc chắn muốn xóa tài khoản này không? Hành động này không thể hoàn tác.
          </p>
          <div className="p-2 bg-light rounded border text-center fw-bold text-dark">
            {account?.username}
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={onClose}
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            className="btn btn-danger px-4"
            onClick={onConfirm}
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountDeleteModal;