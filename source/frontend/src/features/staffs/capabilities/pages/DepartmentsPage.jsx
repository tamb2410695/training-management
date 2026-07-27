/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDepartments } from "../hooks/usedDpartments";
import DepartmentTable from "../components/DepartmentTable";
import { DEPARTMENT_QUERY_DEFAULTS } from "../constants/departmentDefaults";

// Giả định bạn sẽ tạo 3 component con này tương tự như module Account
import DepartmentToolbar from "../components/DepartmentToolbar";
import DepartmentFormModal from "../components/DepartmentModal";
import DepartmentDeleteModal from "../components/DepartmentDeleteModal";

function DepartmentsPage() {
  const {
    departments,
    loading,
    pagination,
    loadDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  } = useDepartments();

  const [query, setQuery] = useState(DEPARTMENT_QUERY_DEFAULTS);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Theo dõi sự thay đổi của query (tìm kiếm, phân trang) để tự động gọi API làm mới dữ liệu
  useEffect(() => {
    const formattedParams = {
      ...query,
      page: Number(query.page || 1),
      limit: Number(query.limit || 10),
    };
    loadDepartments(formattedParams);
  }, [query, loadDepartments]);

  const handleCreate = () => {
    setSelectedDepartment(null);
    setShowForm(true);
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setShowForm(true);
  };

  const handleDelete = (department) => {
    setSelectedDepartment(department);
    setShowDelete(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedDepartment) {
        // Cập nhật thông tin phòng ban chuyên môn (Gửi PUT/PATCH lên backend)
        await updateDepartment(selectedDepartment.departmentId, formData);
      } else {
        // Tạo mới phòng ban chuyên môn (Ví dụ: Khối đào tạo phần mềm, mạng...)
        await createDepartment(formData);
      }

      setShowForm(false);
      setSelectedDepartment(null);
    } catch (error) {
      console.error("Xảy ra lỗi khi lưu phòng ban:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDepartment(selectedDepartment.departmentId);
      setShowDelete(false);
      setSelectedDepartment(null);
    } catch (error) {
      console.error("Xảy ra lỗi khi xóa phòng ban:", error);
    }
  };

  const handleSearch = (newKeyword) => {
    setQuery((prev) => ({
      ...prev,
      search: newKeyword,
      page: 1, // Reset về trang 1 khi tìm kiếm từ khóa mới
    }));
  };

  return (
    <div className="container mt-4">
      {/* Tiêu đề trang và hiển thị tổng số mục */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">Quản Lý Phòng Ban Chuyên Môn</h2>
        <span className="badge bg-primary">
          Tổng số: {pagination?.totalRecords || departments?.length || 0} mục
        </span>
      </div>

      {/* Toolbar chứa thanh ô tìm kiếm bộ phận và nút thêm mới */}
      <div className="card shadow-sm p-3 mb-4 bg-white rounded border-0">
        <DepartmentToolbar
          keyword={query.search || ""}
          onKeywordChange={handleSearch}
          onCreate={handleCreate}
          setQuery={setQuery}
          query={query}
        />
      </div>

      {/* Bảng hiển thị danh sách các phòng ban */}
      <div className="card shadow-sm border-0 mb-4">
        <DepartmentTable
          data={departments}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal Thêm mới / Sửa thông tin phòng ban */}
      <DepartmentFormModal
        open={showForm}
        department={selectedDepartment}
        onClose={() => {
          setShowForm(false);
          setSelectedDepartment(null);
        }}
        onSubmit={handleSubmit}
      />

      {/* Modal Xác nhận xóa phòng ban */}
      <DepartmentDeleteModal
        open={showDelete}
        department={selectedDepartment}
        onClose={() => {
          setShowDelete(false);
          setSelectedDepartment(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default DepartmentsPage;