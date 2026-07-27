function DepartmentToolbar({ keyword, onKeywordChange, onCreate }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-0">
      {/* Ô nhập từ khóa tìm kiếm bộ phận/phòng ban */}
      <input
        className="form-control w-50"
        placeholder="Tìm kiếm theo mã hoặc tên phòng ban..."
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />

      {/* Nút thêm mới phòng ban chuyên môn */}
      <button
        className="btn btn-primary d-flex align-items-center gap-2 fw-semibold"
        onClick={onCreate}
      >
        Thêm Phòng Ban
      </button>
    </div>
  );
}

export default DepartmentToolbar;