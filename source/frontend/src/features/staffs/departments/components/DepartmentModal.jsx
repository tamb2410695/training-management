// components/DepartmentModal.jsx
import { useEffect, useState } from "react";

function DepartmentModal({ open, department, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    departmentCode: "",
    departmentName: "",
  });

  // Theo dõi trạng thái đóng/mở modal để nạp hoặc xóa dữ liệu form
  useEffect(() => {
    if (open) {
      if (department) {
        setFormData({
          departmentCode: department.departmentCode || "",
          departmentName: department.departmentName || "",
        });
      } else {
        setFormData({
          departmentCode: "",
          departmentName: "",
        });
      }
    }
  }, [department, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-start pt-5"
      style={{ zIndex: 1050 }}
    >
      <div className="card p-4 mx-auto w-50 shadow-lg border-0">
        {/* Phần đầu Modal */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0 text-primary fw-bold">
            {department ? "Cập Nhật Phòng Ban" : "Thêm Phòng Ban Mới"}
          </h4>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        {/* Form nhập liệu */}
        <form onSubmit={handleSubmit}>
          {/* Mã phòng ban */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Mã phòng ban
            </label>
            <input
              className="form-control"
              name="departmentCode"
              placeholder="Ví dụ: DPT-SE, DPT-AI, DPT-NW..."
              value={formData.departmentCode}
              onChange={handleChange}
              required
              disabled={!!department} // Không cho phép sửa mã phòng ban khi cập nhật để đảm bảo tính toàn vẹn dữ liệu
            />
          </div>

          {/* Tên phòng ban */}
          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary">
              Tên phòng ban chuyên môn
            </label>
            <input
              className="form-control"
              name="departmentName"
              placeholder="Ví dụ: Bộ Phận Kỹ Thuật Phần Mềm..."
              value={formData.departmentName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Thanh hành động */}
          <div className="d-flex justify-content-end gap-2 mt-2">
            <button type="button" className="btn btn-light" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn btn-primary px-4">
              Lưu cấu hình
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentModal;