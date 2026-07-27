import { ACCOUNT_ROLES, ACCOUNT_STATUS } from "../constants/instructorEnums";

function AccountTable({ data, loading, onEdit, onDelete }) {
  const renderRoleBadges = (roleCodes) => {
    const safeCodes = Array.isArray(roleCodes) ? roleCodes : [];

    if (safeCodes.length === 0) {
      return <span className="text-muted small">Chưa phân quyền</span>;
    }

    return safeCodes.map((code, idx) => {
      const roleConfig = ACCOUNT_ROLES[String(code || "").toUpperCase()] || {
        LABEL: code,
      };

      return (
        <span
          key={idx}
          className="badge bg-light text-dark border me-1 fw-semibold shadow-sm"
        >
          {roleConfig.LABEL}
        </span>
      );
    });
  };

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

  if (safeData.length === 0) {
    return (
      <div className="alert alert-info text-center my-4" role="alert">
        Không tìm thấy tài khoản nào phù hợp.
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
            <th scope="col">Tên đăng nhập</th>
            <th scope="col">Email</th>
            <th scope="col">Vai trò</th>
            <th scope="col" style={{ width: "150px" }}>
              Trạng thái
            </th>
            <th scope="col" style={{ width: "160px" }} className="text-center">
              Hành động
            </th>
          </tr>
        </thead>

        <tbody>
          {safeData.map((account) => {
            const statusKey = String(account.accountStatus || "").toUpperCase();
            const statusConfig = ACCOUNT_STATUS[statusKey] || {
              LABEL: account.accountStatus || "Không rõ",
              COLOR: "secondary",
            };

            return (
              <tr key={account.accountId || account.id}>
                <th scope="row">{account.accountId}</th>
                <td className="fw-bold text-secondary">{account.username}</td>
                <td>{account.email}</td>

                <td>{renderRoleBadges(account.roleCodes)}</td>

                <td>
                  <span className={`badge bg-${statusConfig.COLOR}`}>
                    {statusConfig.LABEL}
                  </span>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-warning btn-sm d-flex align-items-center"
                      onClick={() => onEdit(account)}
                      title="Chỉnh sửa tài khoản"
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger btn-sm d-flex align-items-center"
                      onClick={() => onDelete(account)}
                      title="Xóa tài khoản"
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

export default AccountTable;
