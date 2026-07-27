function DepartmentDeleteModal({ open, department, onClose, onConfirm }) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-start pt-5"
      style={{ zIndex: 1050 }}
    >
      <div className="card p-4 mx-auto w-25 shadow-lg border-0 mt-5">
        {/* Tiêu đề Modal cảnh báo */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 text-danger fw-bold">Xóa Phòng Ban</h4>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>

        {/* Nội dung cảnh báo */}
        <div className="mb-4">
          <p className="text-muted mb-2 small">
            Bạn có chắc chắn muốn xóa phòng ban này không? Hành động này sẽ gỡ bỏ cấu hình phòng ban khỏi hệ thống.
          </p>
          {/* Hiển thị Tên phòng ban để kiểm tra trực quan trước khi xóa */}
          <div className="p-2 bg-light rounded border text-center fw-bold text-dark small">
            {department?.departmentName} ({department?.departmentCode})
          </div>
        </div>

        {/* Thanh hành động */}
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

export default DepartmentDeleteModal;