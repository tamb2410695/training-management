// hooks/useDepartments.js
import { useCrud } from "../../../hooks";
import departmentService from "../services/departmentsService";

export function useDepartments() {
  // Khởi tạo bộ khung CRUD tích hợp sẵn quản lý state (items, loading, pagination,...)
  const crud = useCrud(departmentService, { resourceName: "departments" });

  return {
    departments: crud.items,
    loading: crud.loading,
    error: crud.error,
    pagination: crud.pagination,
    
    // Các hàm tương tác API đồng bộ với Backend Module Department
    loadDepartments: crud.getList,
    createDepartment: crud.createItem,
    updateDepartment: crud.updateItem, // Gọi PUT/PATCH tùy thuộc vào cấu hình service
    deleteDepartment: crud.deleteItem,

    /**
     * Tính năng mở rộng: Phân phối/Gán nhân sự vào phòng ban chuyên môn (Staff Department)
     * Thao tác trực tiếp với API trung gian thông qua một hàm phụ trợ nếu cần tái tải danh sách
     */
    assignStaffToDepartment: async (assignmentData) => {
      await departmentService.assignStaff(assignmentData);
      // Tải lại danh sách hiện tại để cập nhật số lượng hoặc trạng thái nhân sự mới nhất
      await crud.getList({ 
        page: crud.pagination.page, 
        limit: crud.pagination.limit 
      });
    }
  };
}