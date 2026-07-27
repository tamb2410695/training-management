import { useAuth } from "../../hooks/auth/useAuth";

function StudentProfilePage() {

    const { account } = useAuth();
  
    return (
      <div>
        <h2>Thông tin học viên</h2>
        {account ? (
          <div>
            <h3>Xin chào, {account.name || account.username}!</h3>
            <p>
              <strong>Email:</strong> {account.email}
            </p>
            <p>
              <strong>Vai trò:</strong> {account.role || "Admin"}
            </p>
          </div>
        ) : (
          <p>Đang tải thông tin tài khoản</p>
        )}
      </div>
    );
};
export default StudentProfilePage;