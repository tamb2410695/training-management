/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAccounts } from "../hooks/useCourses";
import CourseDeleteModal from "../components/CourseDeleteModal";
import CourseToolbar from "../components/CourseToolbar";
import CourseTable from "../components/CourseTable";
import CourseFormModal from "../components/CourseModal";
import { ACCOUNT_QUERY_DEFAULTS } from "../constants/courseDefaults";

function CoursesPage() {
  const {
    accounts,
    loading,
    pagination,
    loadAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    changeAccountRole, 
  } = useAccounts();

  const [query, setQuery] = useState(ACCOUNT_QUERY_DEFAULTS);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const formattedParams = {
      ...query,
      page: Number(query.page || 1),
      limit: Number(query.limit || 10),
    };
    loadAccounts(formattedParams);
  }, [query, loadAccounts]);

  const handleCreate = () => {
    setSelectedAccount(null);
    setShowForm(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setShowForm(true);
  };

  const handleDelete = (account) => {
    setSelectedAccount(account);
    setShowDelete(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedAccount) {
        const accountPayload = {
          email: formData.email,
          accountStatus: formData.accountStatus,
          ...(formData.password && { password: formData.password }),
        };

        await updateAccount(selectedAccount.accountId, accountPayload);

        const targetRoleCode = formData.roleCodes?.[0];
        const originalRoleCode = selectedAccount.roleCodes?.[0];

        if (targetRoleCode && targetRoleCode !== originalRoleCode) {
          if (typeof changeAccountRole === "function") {
            await changeAccountRole(selectedAccount.accountId, targetRoleCode);
          }
        }
      } else {
        await createAccount(formData);
      }

      setShowForm(false);
      setSelectedAccount(null);
    } catch (error) {
      console.error("Xảy ra lỗi khi lưu tài khoản:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAccount(selectedAccount.accountId);
      setShowDelete(false);
      setSelectedAccount(null);
    } catch (error) {
      console.error("Xảy ra lỗi khi xóa tài khoản:", error);
    }
  };

  const handleSearch = (newKeyword) => {
    setQuery((prev) => ({
      ...prev,
      search: newKeyword,
      page: 1,
    }));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark fw-bold mb-0">Quản Lý Tài Khoản</h2>
        <span className="badge bg-secondary">
          Tổng số: {pagination?.totalRecords || accounts?.length || 0} mục
        </span>
      </div>

      {/* Toolbar chứa thanh ô tìm kiếm và bộ lọc nâng cao */}
      <div className="card shadow-sm p-3 mb-4 bg-white rounded border-0">
        <CourseToolbar
          keyword={query.search || ""}
          onKeywordChange={handleSearch}
          onCreate={handleCreate}
          setQuery={setQuery}
          query={query}
        />
      </div>

      {/* Bảng danh sách tài khoản */}
      <div className="card shadow-sm border-0 mb-4">
        <CourseTable
          data={accounts}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal Thêm mới / Sửa */}
      <CourseFormModal
        open={showForm}
        account={selectedAccount}
        onClose={() => {
          setShowForm(false);
          setSelectedAccount(null);
        }}
        onSubmit={handleSubmit}
      />

      {/* Modal Xác nhận xóa */}
      <CourseDeleteModal
        open={showDelete}
        account={selectedAccount}
        onClose={() => {
          setShowDelete(false);
          setSelectedAccount(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default CoursesPage;