import { useAuth } from "../../../hooks/auth/useAuth";

function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h2>ADMIN DASHBOARD</h2>
      {user ? (
        <div>
          <h3>Xin chào, {user.username}!</h3>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Vai trò:</strong> {user.roleName || "Admin"}
          </p>
        </div>
      ) : (
        <p>Đang tải thông tin tài khoản</p>
      )}
    </div>
  );
}

export default AdminDashboardPage;
