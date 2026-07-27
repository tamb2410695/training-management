function DepartmentTable({ data, loading, onEdit, onDelete }) {
  
  // Trạng thái Loading quay tròn theo chuẩn chung của hệ thống
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const safeData = Array.isArray(data) ? data : [];

  // Trạng thái hiển thị khi danh sách trống
  if (safeData.length === 0) {
    return (
      <div className="alert alert-info text-center my-4" role="alert">
        Không tìm thấy phòng ban nào phù hợp.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              ID
            </th>
            <th scope="col" style={{ width: "200px" }}>
              Mã phòng ban
            </th>
            <th scope="col">Tên phòng ban chuyên môn</th>
            <th scope="col" style={{ width: "160px" }} className="text-center">
              Hành động
            </th>
          </tr>
        </thead>

        <tbody>
          {safeData.map((department) => {
            return (
              <tr key={department.departmentId || department.id}>
                {/* ID Phòng ban */}
                <th scope="row">{department.departmentId}</th>
                
                {/* Mã phòng ban (Ví dụ: DPT-SE, DPT-AI) */}
                <td className="fw-bold text-primary">{department.departmentCode}</td>
                
                {/* Tên phòng ban (Ví dụ: Bộ Phận Kỹ Thuật Phần Mềm) */}
                <td className="fw-semibold text-secondary">{department.departmentName}</td>

                {/* Các nút tương tác */}
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-warning btn-sm d-flex align-items-center"
                      onClick={() => onEdit(department)}
                      title="Chỉnh sửa thông tin phòng ban"
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger btn-sm d-flex align-items-center"
                      onClick={() => onDelete(department)}
                      title="Xóa phòng ban"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;